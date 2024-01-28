function call_hex_bin() {
    var hexStr = document.getElementById("hexInput").value;
    var binStr = '';
    
    for (var i = 0; i < hexStr.length; i++) {
        var binDigit = parseInt(hexStr[i], 16).toString(2);
        // Pad with zeros to ensure 4 bits per hex digit
        binDigit = binDigit.padStart(4, '0');
        binStr += binDigit;
    }

    document.getElementById("binOutput").value = binStr;
}