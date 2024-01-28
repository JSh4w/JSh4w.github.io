function hex_bin_row1(hexStr) {
    var binStr = '';
    for (var i = 0; i < hexStr.length; i++) {
        var binDigit = parseInt(hexStr[i], 16).toString(2);
        // Pad with zeros to ensure 4 bits per hex digit
        binDigit = binDigit.padStart(4, '0');
        binStr += binDigit;
    }
    return binStr;
}

function call_hex_bin_row1(){
    var hexStr= document.getElementById("hexInput").value;
    try{
        const result = hex_bin_row1(hexStr);
        document.getElementById("binOutput").value= result;
    } catch (e) {
        document.getElementById("binOutput").value= e.message;
    }
}
