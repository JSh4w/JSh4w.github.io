function hexbin(){
    var hexIn= document.getElementById("hexIn").value;
    let x = "";
    for (let a of hexIn) {
        x += hex_to_bin[a];
    }
    document.getElementById('binOut').value = x;
    return x;
}