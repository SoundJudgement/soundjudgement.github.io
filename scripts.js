
//function to encipher using caesars cipher
function caesarEncipher(){
	if (document.getElementById("caesar_text").value === "") {	// check for empty boxes
                alert("Please enter some text to encipher.");
				return false;
    } else if (document.getElementById("caesar_key").value === "") {
                alert("Please enter a valid key.");
				return false;
            }
	if(isNaN(document.getElementById("caesar_key").value))	{	// chexck key is a number
		alert("Please input a valid number");
		return false;
	}
	var alph = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var alength = alph.length;
	var text = document.getElementById("caesar_text").value.toUpperCase();  // send to uppse case so we can compare with our alphabet
	var key = parseInt(document.getElementById("caesar_key").value);
	var encipheredText = "";
	var i = 0;
	var newIndex;
	for (var c=0; c<text.length; c++){    // iterate through characters of input text
		
		for (var l = 0; l<alph.length; l++){   // for each character search for corresponding alph entry then shift the index by the input key for the new index and thus the encipherment
			if (text[c] === alph[l]){
				newIndex = (((l+key)%alength)+alength)%alength; // had to add additional steps '+26)%26' to deal with negative 													and (pointlessly) large numbers
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
	document.getElementById("caesar_output").innerHTML = "Enciphered Text is '" + encipheredText + "'";
}

function caesarDecipher(){  // exactly the same as encipher but we subtract the key amount rather than add.
	if (document.getElementById("caesar_text").value === "") {
                alert("Please enter the text to decipher.");
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
	var alength = alph.length;
	var text = document.getElementById("caesar_text").value.toUpperCase();
	var key = parseInt(document.getElementById("caesar_key").value);
	var decipheredText = "";
	var i = 0;
	var newIndex;
	for (var c=0; c<text.length; c++){
		
		for (var l = 0; l<alph.length; l++ in alph){
			if (text[c] === alph[l]){
				newIndex = (((l-key)%alength)+alength)%alength; // had to add additional steps '+26)%26' to deal with negative numbers
				//alert(newIndex);
				decipheredText += alph[newIndex];
				i++;
			}
		}
		// check for non alphabetic characters, to maintain sentence structure
		if(text[c] === " " || text[c] === "." || text[c] === "," || text[c] === "-" || text[c] === "?" || text[c] === "!"){
				decipheredText += text[c];
		}
	}
	document.getElementById("caesar_output").innerHTML = "Deciphered Text is '" + decipheredText + "'";
}

// function to encipher using hills cipher. 
function hillEncipher(){				// check for empty boxes
	//if(document.getElementById("hill_text").value.length !== 3){
	//	alert("Due to limitations within this code, the Hill Cipher can only encrypt a message of exactly 3 letters.");
	//	return false;
	//}
	if (document.getElementById("hill_text").value === "") {
                alert("Please enter some text to encipher.");
				return false;
	}
	else if (document.getElementById("m1").value === "" || document.getElementById("m8").value === "" || 			document.getElementById("m9").value === "" || document.getElementById("m2").value === "" || 	 document.getElementById("m3").value === "" || document.getElementById("m4").value === "" || document.getElementById("m5").value === "" || document.getElementById("m6").value === "" || document.getElementById("m7").value === "" ) {
                alert("Please enter a valid key - all boxes must contain an integer corresponding to a letter of the alphabet (A=0, B=1, C=2 ... Z=25)");
				return false;
            }
	
	var alph = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var alength = alph.length;
	var text = document.getElementById("hill_text").value.toUpperCase();
	//var keyText = document.getElementById("hill_key").value.toUpperCase();
	var decipheredText = "";
	var encipheredText = "";
	var encipheredMatrix = [];
	var key = [];
	var textVector = [];
	var textMatrix = [];
	var coFactor = [];
	var inverseKey = [];
	var matrixOfMinors = [];
	var adjugate = [];
	for(var i=0; i<3; i++) {
    	key[i] = new Array(3);
		coFactor[i] = new Array(3);
		inverseKey[i] = new Array(3);
		matrixOfMinors[i] = new Array(3);
		adjugate[i] = new Array(3);
	}		// assign values to key matrix
	key[0][0] = parseInt(document.getElementById("m1").value);
	key[0][1] = parseInt(document.getElementById("m2").value);
	key[0][2] = parseInt(document.getElementById("m3").value);
	key[1][0] = parseInt(document.getElementById("m4").value);
	key[1][1] = parseInt(document.getElementById("m5").value);
	key[1][2] = parseInt(document.getElementById("m6").value);
	key[2][0] = parseInt(document.getElementById("m7").value);
	key[2][1] = parseInt(document.getElementById("m8").value);
	key[2][2] = parseInt(document.getElementById("m9").value);
	// find key determinant
	var key_determinant = key[0][0] * ( (key[1][1]*key[2][2]) - (key[1][2]*key[2][1]) ) - 
						  key[0][1] * ( (key[1][0]*key[2][2]) - (key[1][2]*key[2][0]) ) + 
						  key[0][2] * ( (key[1][0]*key[2][1]) - (key[1][1]*key[2][0]) );
	if(key_determinant === 0){
		alert("Matrix is not invertible. Use the example given or search for an invertible matrix. Or try another random key!");
		
	}else{
	// find inverse of key matrix - i did it using determinants. 
	// so find the matrix of minors
	matrixOfMinors[0][0] = (key[1][1]*key[2][2]) - (key[1][2]*key[2][1]);
	matrixOfMinors[0][1] = (key[1][0]*key[2][2]) - (key[1][2]*key[2][0]);
	matrixOfMinors[0][2] = (key[1][0]*key[2][1]) - (key[1][1]*key[2][0]);
	matrixOfMinors[1][0] = (key[0][1]*key[2][2]) - (key[0][2]*key[2][1]);
	matrixOfMinors[1][1] = (key[0][0]*key[2][2]) - (key[0][2]*key[2][0]);
	matrixOfMinors[1][2] = (key[0][0]*key[2][1]) - (key[0][1]*key[2][0]);
	matrixOfMinors[2][0] = (key[0][1]*key[1][2]) - (key[0][2]*key[1][1]);
	matrixOfMinors[2][1] = (key[0][0]*key[1][2]) - (key[0][2]*key[1][0]);
	matrixOfMinors[2][2] = (key[0][0]*key[1][1]) - (key[0][1]*key[1][0]);
	
	// then we can find the cofactors
	var signflipper = 1;
	for(i = 0; i < 3; i++){
		for(var j = 0; j <3; j++){
			coFactor[i][j] = matrixOfMinors[i][j] * signflipper;
			signflipper *= -1;
		}
	}
	// from this we can find the adjugate
	adjugate[0][0] = coFactor[0][0];
	adjugate[0][1] = coFactor[1][0];
	adjugate[0][2] = coFactor[2][0];
	adjugate[1][0] = coFactor[0][1];
	adjugate[1][1] = coFactor[1][1];
	adjugate[1][2] = coFactor[2][1];
	adjugate[2][0] = coFactor[0][2];
	adjugate[2][1] = coFactor[1][2];
	adjugate[2][2] = coFactor[2][2];
	// and from this the inverse matrix
	var z = 1/key_determinant;
	for(i = 0; i<3; i++){
		for(var j = 0; j<3; j++){
			inverseKey[i][j] = adjugate[i][j] * z;			
		}
	}	
	// Now to turn the input text into a vector
	var i = 0;
	for (var c=0; c<text.length; c++){
		for (var l = 0; l<alph.length; l++ in alph){
			if (text[c] === alph[l]){
				textVector[i] = l;  
				i++;
			}
		}	
	}								// CORRECT UP TO HERE!!!!
	if(textVector.length%3 === 1){
		textVector[i] = 0;
		i++;
		textVector[i] = 0;
	}
	if(textVector.length%3 === 2){
		textVector[i] = 0;
	}
	//  create the matrix from the input text with 3 rows as the key is always 3x3.
	var matrixDepth;
	if(textVector.length > 3){
	   	matrixDepth = textVector.length/3;
	}else {
		matrixDepth = 1;
	}
	// Check matrix depth is 1 or above, if above one we need to turn from vector to actual matrix, if not above 1, leave as is.
	if(matrixDepth>1){
		for(var i = 0; i<3; i++){
			textMatrix[i] = new Array(matrixDepth); 
			encipheredMatrix[i] = new Array(matrixDepth);
		}
	}
	// need to populate the text matrix
	
	var numberCheck;
	// two methods depending on whether 1 or more depth.
	if(matrixDepth === 1){	
		var k = 0;
		for(var i=0; i<3; i++){
			textMatrix[i] = textVector[k];
			k++;
		}				// textMatrix FINE UP TO HERE.
			
		// now to multiply the text matrix with the key matrix, we do it 1 vector of 3 at a time, and then the modulo of each element
		
		for(var j = 0; j<3; j++){
			numberCheck = 0;
			for(var i = 0; i<3;i++){
				numberCheck += (key[j][i] * textMatrix[i]);
			}
			encipheredMatrix[j] = numberCheck%alength;
		}
		alert(encipheredMatrix);
		
	}else{
		// and here for matrices above 1 depth.
		var k = 0;
		for(var j = 0; j < matrixDepth; j++){
			for(var i=0; i<3; i++){
				textMatrix[j][i] = textVector[k];
				k++;
			}	
		}				
		// now to multiply the text matrix with the key matrix, we do it 1 vector of 3 at a time, and then the modulo of each element
		for(var k = 0; k < matrixDepth; k++){
			for(var j = 0; j<3; j++){
				numberCheck = 0;
				for(var i = 0; i<3;i++){
					numberCheck += (key[j][i] * textMatrix[k][i]);
				}
				encipheredMatrix[k][j] = numberCheck%alength;
			}	
		}
		alert(encipheredMatrix);
	}
	
}
}
