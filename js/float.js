window.onload = function() {
    selectType('custom'); // Select 'custom' on page load
};

function selectType(type) {
    // Disable all input fields initially
    document.getElementById('ew').disabled = true;
    document.getElementById('mw').disabled = true;

    // Reset all buttons to unselected state
    document.getElementById('custom').disabled = false;
    document.getElementById('F16').disabled = false;
    document.getElementById('F32').disabled = false;
    document.getElementById('BF16').disabled = false;
    document.getElementById('TF32').disabled = false;
    document.getElementById('F64').disabled = false;

    // Enable inputs and set the button to selected state for 'custom'
    if (type === 'custom') {
        document.getElementById('ew').disabled = false;
        document.getElementById('mw').disabled = false;
        document.getElementById('customInputs').style.display = '';
        document.getElementById('custom').disabled = true;
    } else {
        document.getElementById('customInputs').style.display = 'none';
        document.getElementById(type).disabled = true;
    }
}

function hexDec(ew, mw, h) {
    let x = "";

    //convert h, the hexadecimal input into binary
    for (var i = 0; i < h.length; i++) {
        var binDigit = parseInt(h[i], 16).toString(2);
        // Pad with zeros to ensure 4 bits per hex digit
        binDigit = binDigit.padStart(4, '0');
        x += binDigit;
    }

    //take off first bit for TF32 as only 19 bits long
    if (document.getElementById("TF32").disabled === true){
        x=x.substring(1);
    }else if (ew+mw+1 !==x.length){
        x=x.substring(x.length-ew-mw-1);
    }
    if (x.length !== ew + mw + 1) {
        throw new Error("Invalid Inputs");
    }
    const sign = x[0];
    const e = x.substring(1, ew + 1);
    const m = x.substring(ew + 1);
    let exp = -Math.pow(2, ew - 1) + 1;
    let mant = 0;

    // Check for zeros, infinities, and NaNs
    if (e === '0'.repeat(ew)) {
        if (m === '0'.repeat(mw)) {
            return 0; // Zero
        }
        console.log("Denormal");
        exp += 1;
    } else if (e === '1'.repeat(ew)) {
        if (m === '0'.repeat(mw)) {
            return sign === "0" ? Infinity : -Infinity; // Infinity
        }
        return NaN; // NaN
    } else {
        mant = 1.0; // Normalized number
    }

    //calculating exponent and mantissa
    for (let i = 0; i < e.length; i++) {
        exp += parseInt(e[i]) * Math.pow(2, e.length - 1 - i);
    }
    for (let i = 0; i < m.length; i++) {
        mant += parseInt(m[i]) * Math.pow(2, -(i + 1));
    }
    const s = sign === "0" ? 1 : -1;
    return s * Math.pow(2, exp) * mant;
}

function hex_to_bin_colour(ew,mw,h){
    let x = "";

    for (var i = 0; i < h.length; i++) {
        var binDigit = parseInt(h[i], 16).toString(2);
        // Pad with zeros to ensure 4 bits per hex digit
        binDigit = binDigit.padStart(4, '0');
        x += binDigit;
    }

    if (document.getElementById("TF32").disabled === true){
        x=x.substring(1);
    }else if (ew+mw+1 !==x.length){
        x=x.substring(x.length-ew-mw-1);
    }
    var sign_2 = x[0];
    var e_2 = x.substring(1, ew + 1);
    var m_2 = x.substring(ew + 1);
     // Display in an element
    //    Create color-coded HTML
    const binaryHTML = `<span class="signBit">${sign_2}</span>` +
                      `<span class="exponentBits">${e_2}</span>` +
                       `<span class="mantissaBits">${m_2}</span>`;
   // Display in an element
    return binaryHTML;

}

function convert() {
    var ew = document.getElementById('ew').value;
    if(ew<0){
        ew=1
        throw new Error("Exponent width must be > 1");
    }
    var mw = document.getElementById('mw').value;
    if(mw<0){
        mw=1
        throw new Error("Mantissa width must be > 1");
    }
    const h = document.getElementById('h').value.toLowerCase();
    const regex= /^(0x|0X)?[a-fA-F0-9]+$/;
    if (!regex.test(h)){
        throw new Error("Hexadecimal must be in the set a-f, 0-9");
    }

    var hex_length= h.length;
    if (ew==='' && mw==='' && document.getElementById("custom").disabled===true){
        if(hex_length===4){
            ew=5;
            mw=10;
        }else if(hex_length===8){
            ew=8;
            mw=23;
        }else if(hex_length===16){
            ew=11;
            mw=52;
        }
    }else{
        ew=parseInt(ew);
        mw=parseInt(mw);
    }
    if (document.getElementById("F16").disabled === true){
        ew=5;
        mw=10;
    }else if (document.getElementById("F32").disabled === true){
        ew=8;
        mw=23;
    }else if (document.getElementById("BF16").disabled === true){
        ew=8;
        mw=7;
    }else if (document.getElementById("TF32").disabled === true){
        ew=8;
        mw=10;
    }else if (document.getElementById("F64").disabled === true){
        ew=11;
        mw=52;
    }
    try {
        const result = hexDec(ew, mw, h);
        document.getElementById('result').value = result;
        document.getElementById('binaryDisplay').innerHTML = hex_to_bin_colour(ew,mw,h);
    } catch (e) {
        document.getElementById('result').value = e.message;
    }
}

