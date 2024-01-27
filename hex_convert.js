const hex_to_bin = {
    "0": "0000", "1": "0001", "2": "0010", "3": "0011", 
    "4": "0100", "5": "0101", "6": "0110", "7": "0111", 
    "8": "1000", "9": "1001", "a": "1010", "b": "1011", 
    "c": "1100", "d": "1101", "e": "1110", "f": "1111"
};

function hexbin(hexIn){
    var hexIn= document.getElementById("hexIn").value;
    let x = "";
    hexIn = hexIn.toLowerCase(); // Convert input to lowercase
    for (let a of hexIn) {
         x += hex_to_bin[a];
    }
    return x;
}

function call_hex_bin(){
    var binStr= document.getElementById("hexInput").value;
    document.getElementById("binOutput").value= binStr;
    //try{
    //    const result = hexbin(binStr);
    //    document.getElementById("binOutput").value= result;
    //} catch (e) {
    //    document.getElementById("binOutput").value= e.message;
    //s}
}
