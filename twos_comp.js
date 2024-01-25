function twos_complement_to_dec(binStr) {
    //const isNeg = binStr.startsWith('1');
    let neg_bin_val = binStr;
    if (isNeg){
        //switch the bits
        neg_bin_val = binStr.split('').map(bit => bit == '0' ? '1' : '0').join('');

        //add 1 to inverted bits
        let carry=1;
        let result ='';
        for (let i = neg_bin_val.length -1; i>=0; i--){
            if (neg_bin_val[i]==='1' && carry===1){
                result= '0' +result;
            } else{
                if (carry===1){
                    result = '1' + result;
                    carry=0;
                } else {
                    result = neg_bin_val[i]+result;
                }
            }
        }
    }
    let dec=0;
    for (let i=0; i< result.length; i++){
        dec+=parseInt(result[i]) * Math.pow(2, dec.length -1 -i);
    }
    return isNeg ? -dec : dec;
}

document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.getElementById('binaryInput');
    const outputElement = document.getElementById('decimalOutput');
    inputElement.addEventListener('input', function() {
        const binStr = inputElement.value;
        outputElement.textContent = twosComplementToDecimal(binStr);
    });
});


function hexbin(hexStr){
    let x = "";
    for (let a of hexStr) {
        x += hex_to_bin[a];
    }
    return x;
}