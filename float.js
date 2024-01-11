const hex = {
    "0": "0000", "1": "0001", "2": "0010", "3": "0011", 
    "4": "0100", "5": "0101", "6": "0110", "7": "0111", 
    "8": "1000", "9": "1001", "a": "1010", "b": "1011", 
    "c": "1100", "d": "1101", "e": "1110", "f": "1111"
};

function hexDec(ew, mw, h) {
    let x = "";
    for (let a of h) {
        x += hex[a];
    }
    const sign = x[0];
    if (x.length !== ew + mw + 1) {
        throw new Error("Invalid length");
    }
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

function fillIfEmpty(x) {
    var inputField = document.getElementById(x);
    if (inputField.value === '') {
      inputField.value = ''; // Replace 'Default Value' with the value you want to set
    }
  }

//parseInt()
function convert() {
    var ew = document.getElementById('ew').value;
    var mw = document.getElementById('mw').value;
    const h = document.getElementById('h').value.toLowerCase();
    var hex_length= h.length;
    if (ew==='' && mw===''){
        if(hex_length===4){
            ew=5;
            mw=10;
        }else if(hex_length===8){
            ew=8;
            mw=23;
        }else if(hex_length===16){
            ew=11;
            mw=52;
        }else{
            alert("Non-standard hex length");
        }
    }else{
        ew=parseInt(ew);
        mw=parseInt(mw);
    }
    try {
        const result = hexDec(ew, mw, h);
        document.getElementById('result').value = result;
    } catch (e) {
        alert(e.message);
    }
}
