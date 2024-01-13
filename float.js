const hex_to_bin = {
    "0": "0000", "1": "0001", "2": "0010", "3": "0011", 
    "4": "0100", "5": "0101", "6": "0110", "7": "0111", 
    "8": "1000", "9": "1001", "a": "1010", "b": "1011", 
    "c": "1100", "d": "1101", "e": "1110", "f": "1111"
};

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
    for (let a of h) {
        x += hex_to_bin[a];
    }
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

function hex_to_bin_colour(ew,h){
    let x = "";
    for (let a of h) {
        x += hex+hex_to_bin[a];
    }
    if (document.getElementById("TF32").disabled === true){
        x=x.substring(1);
    }
    var sign = x[0];
    var e = x.substring(1, ew + 1);
    var m = x.substring(ew + 1);
     // Display in an element
    //document.getElementById('binaryDisplay').innerHTML = sign+e+m;
    //    Create color-coded HTML
    const binaryHTML = `<span class="signBit">${sign}</span>` +
                       `<span class="exponentBits">${e}</span>` +
                       `<span class="mantissaBits">${m}</span>`;
    return binaryHTML;
    //document.getElementById('binaryDisplay').innerHTML = binaryHTML;
    
    //displayElement.innerHTML = `<span class="signBit">${sign}</span><span class="exponentBits">${exponent}</span><span class="mantissaBits">${mantissa}</span>`;
}




function convert() {
    var ew = document.getElementById('ew').value;
    var mw = document.getElementById('mw').value;
    const h = document.getElementById('h').value.toLowerCase();
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
    }
    try {
        const result = hexDec(ew, mw, h);
        document.getElementById('result').value = result;
        document.getElementById('binaryDisplay').innerHTML = hex_to_bin_colour(ew,h);
        //hex_to_bin_colour(ew, mw, h);
    } catch (e) {
        document.getElementById('result').value = e.message;
    }
}
