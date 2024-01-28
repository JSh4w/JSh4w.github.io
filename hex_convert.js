function call_hex_bin() {
    var hexStr = document.getElementById("hexInput").value;
    var binStr = parseInt(hexStr, 16).toString(2);
    document.getElementById("binOutput").value = binStr;
}