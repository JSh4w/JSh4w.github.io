function twos_to_dec(binStr) {
    binStr = binStr.replace(/[^01]/g, '');
    document.getElementById("binaryInput").value=binStr;

    const isNeg = binStr.startsWith('1');
    let result = binStr;
    
    if (isNeg){
        //switch the bits
        let neg_bin_val = binStr.split('').map(bit => bit == '0' ? '1' : '0').join('');

        //add 1 to inverted bits
        let carry=1;
        result ='';
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
        dec+=parseInt(result[i]) * Math.pow(2, result.length -1 -i);
    }
    var output = isNeg ? -dec : dec;
    return output;
}

function call_twos_to_dec(){
    var binStr= document.getElementById("binaryInput").value;
    try{
        const result = twos_to_dec(binStr);
        document.getElementById("decimalOutput").value= result;
    } catch (e) {
        document.getElementById("decimalOutput").value= e.message;
    }
}
