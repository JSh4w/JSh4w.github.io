function hexbin(){
    var hexIn= document.getElementById("hexIn").value;
    let x = "";
    hexIn = hexIn.toLowerCase(); // Convert input to lowercase
    for (let a of hexIn) {
        if (hex_to_bin.hasOwnProperty(a)) {
            x += hex_to_bin[a];
        } else {
            throw new Error("Invalid hexadecimal character: " + a);
        }
    }
    document.getElementById('binOut').value = hexIn;
}
