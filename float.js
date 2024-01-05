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
    
    if (e === '0'.repeat(e.length)) {
        console.log("denorm");
        exp += 1;
    } else {
        mant = 1.0;
    }
    for (let i = 0; i < e.length; i++) {
        exp += parseInt(e[i]) * Math.pow(2, e.length - 1 - i);
    }
    for (let i = 0; i < m.length; i++) {
        mant += parseInt(m[i]) * Math.pow(2, -(i + 1));
    }
    const s = sign === "0" ? 1 : -1;
    //return s * Math.pow(2, exp) * mant;
    const result = s *Math.pow(2,exp) *mant;
    document.getElementById("text").innerText=result;
}
window.onload = hexDec('5','10','1234')