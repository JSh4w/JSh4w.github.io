const hex_to_bin = {
    "0": "0000", "1": "0001", "2": "0010", "3": "0011", 
    "4": "0100", "5": "0101", "6": "0110", "7": "0111", 
    "8": "1000", "9": "1001", "a": "1010", "b": "1011", 
    "c": "1100", "d": "1101", "e": "1110", "f": "1111"
};

function hexbin(hexIn){
    let x = "";
    for (let a of hexIn) {
        x += hex_to_bin[a];
    }
    //document.getElementById('binOut').value = x;
    return x;
}

function call_hexbin(){
    var hexIn= document.getElementById("hexIn").value;
    try {
        const result = hexbin(hexIn);
        document.getElementById('binOut').value = result;
  } catch (e) {
        document.getElementById('binOut').value = e.message;
    }
}