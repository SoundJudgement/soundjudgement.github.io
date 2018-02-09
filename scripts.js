function caesarEncipher(){
	if (document.getElementById("caesar_text").value === "") {
                alert("Please enter some text to encipher.");
				return false;
    } else if (document.getElementById("caesar_key").value === "") {
                alert("Please enter a valid key.");
				return false;
            }
	if(isNaN(document.getElementById("caesar_key").value))	{
		alert("Please input a valid number");
		return false;
	}
	var alph = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var text = document.getElementById("caesar_text").value.toUpperCase();
	var key = parseInt(document.getElementById("caesar_key").value);
	var encipheredText = "";
	var i = 0;
	var newIndex;
	for (var c=0; c<text.length; c++){
		
		for (var l = 0; l<alph.length; l++ in alph){
			if (text[c] === alph[l]){
				newIndex = (((l+key)%26)+26)%26; // had to add additional steps '+26)%26' to deal with negative numbers
				//alert(newIndex);
				encipheredText += alph[newIndex];
				i++;
			}
		}
		// check for non alphabetic characters, to maintain sentence structure
		if(text[c] === " " || text[c] === "." || text[c] === "," || text[c] === "-" || text[c] === "?" || text[c] === "!"){
				encipheredText += text[c];
		}
	}
	alert("Enciphered Text is '" + encipheredText + "'");
}

