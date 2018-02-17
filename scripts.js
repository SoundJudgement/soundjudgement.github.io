// Author: Lee Robinson
// Project: SET08101 CW scripts
// Last updated 17/02/2018 03:28

//function to encipher using caesars pathetic cipher
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
	
	if (document.getElementById("hill_text").value === "") {
                alert("Please enter some text to encipher.");
				return false;
	}
	else if (document.getElementById("m1").value === "" || document.getElementById("m8").value === "" || 			document.getElementById("m9").value === "" || document.getElementById("m2").value === "" || 	 document.getElementById("m3").value === "" || document.getElementById("m4").value === "" || document.getElementById("m5").value === "" || document.getElementById("m6").value === "" || document.getElementById("m7").value === "" ) {
                alert("Please enter a valid key - all boxes must contain an integer corresponding to a letter of the alphabet (A=0, B=1, C=2 ... Z=25, space=26, .=27, !=28)");
				return false;
            }
	// extra characters in alphabet to ensure modulus is prime
	var alph = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", " ", ".", "?"];
	var alength = alph.length;
	var text = document.getElementById("hill_text").value.toUpperCase();
	var decipheredText = "";
	var encipheredText = "";
	var encipheredMatrix = [];
	var key = [];
	var textVector = [];
	var textMatrix = [];
	var coFactor = [];
	var inverseKey = [];
	var realInverseKey = [];
	var matrixOfMinors = [];
	var adjugate = [];
	var inverseDeterminant
	for(var i=0; i<3; i++) {
    	key[i] = new Array(3);
		coFactor[i] = new Array(3);
		inverseKey[i] = new Array(3);
		realInverseKey[i] = new Array(3);
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
	if(key_determinant === 0 ){
		alert("Matrix is not invertible. Try another random key!");
		return false;
	}else{
	// find inverse determinant
	for(var i = 2; i<alength; i++){
		if((key_determinant * i) % alength === 1){
			inverseDeterminant = i;
		}
	}	
	
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
	// from this we can find the adjugate and the values for the inversekey
	adjugate[0][0] = coFactor[0][0];
	adjugate[0][1] = coFactor[1][0];
	adjugate[0][2] = coFactor[2][0];
	adjugate[1][0] = coFactor[0][1];
	adjugate[1][1] = coFactor[1][1];
	adjugate[1][2] = coFactor[2][1];
	adjugate[2][0] = coFactor[0][2];
	adjugate[2][1] = coFactor[1][2];
	adjugate[2][2] = coFactor[2][2];
	for(var i = 0; i<3; i++){
		for(var j = 0; j <3; j++){
			while(adjugate[i][j] < 0){
				adjugate[i][j] += alength;
			}
			if(isNaN(((adjugate[i][j]%alength) * inverseDeterminant)%alength)){
				alert("Matrix is not invertible. Try another random key! It is better to make sure there are not so many repeating numbers or 0's.");
				return false;
			}
			realInverseKey[i][j] =((adjugate[i][j]%alength) * inverseDeterminant)%alength;		
		}
	}
	// and from this the inverse matrix
	var z = 1/key_determinant; 		 
	for(i = 0; i<3; i++){
		for(var j = 0; j<3; j++){
			inverseKey[i][j] = adjugate[i][j] + "/" + key_determinant;			
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
	}		
	// need to add padding in form of extra 0's
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
		}				
			
		// now to multiply the text matrix with the key matrix, we do it 1 vector of 3 at a time, and then the modulo of each element
		
		for(var j = 0; j<3; j++){
			numberCheck = 0;
			for(var i = 0; i<3;i++){
				numberCheck += (key[j][i] * textMatrix[i]);
			}
			encipheredMatrix[j] = numberCheck%alength;
			encipheredText += alph[encipheredMatrix[j]];
		}	
	}else{
		// and here for matrices above 1 depth.
		var k = 0;
		for(var j = 0; j < matrixDepth; j++){
			for(var i=0; i<3; i++){
				textMatrix[i][j] = textVector[k];
				k++;
			}	
		}
		for(var k = 0; k < matrixDepth; k++){
			for(var j = 0; j<3; j++){
				numberCheck = 0;
				for(var i = 0; i<3;i++){
					numberCheck += (key[j][i] * textMatrix[i][k]);
				}
				encipheredMatrix[j][k] = numberCheck%alength;
				encipheredText += alph[encipheredMatrix[j][k]];
			}	
		}
	}
	document.getElementById("hill_ciphertext").style.visibility = "visible";
	document.getElementById("hill_ciphertext").innerHTML = "Enciphered Text: " + encipheredText;
	document.getElementById("invMat_text").style.visibility = "visible";
	document.getElementById("matrix_inverse1").style.visibility = "visible";
	document.getElementById("matrix_inverse2").style.visibility = "visible";
	document.getElementById("matrix_inverse3").style.visibility = "visible";
	document.getElementById("matrix_inverse1").innerHTML = realInverseKey[0][0] + "&emsp;" + realInverseKey[0][1] + "&emsp;" + realInverseKey[0][2];
	document.getElementById("matrix_inverse2").innerHTML = realInverseKey[1][0] + "&emsp;" + realInverseKey[1][1] + "&emsp;" + realInverseKey[1][2];
	document.getElementById("matrix_inverse3").innerHTML = realInverseKey[2][0] + "&emsp;" + realInverseKey[2][1] + "&emsp;" + realInverseKey[2][2];
	}
}

function hillDecipher(){				// check for empty boxes
	
	if (document.getElementById("hill_text").value === "") {
                alert("Please enter some enciphered text to decipher.");
				return false;
	}
	else if (document.getElementById("m1").value === "" || document.getElementById("m8").value === "" || 			document.getElementById("m9").value === "" || document.getElementById("m2").value === "" || 	 document.getElementById("m3").value === "" || document.getElementById("m4").value === "" || document.getElementById("m5").value === "" || document.getElementById("m6").value === "" || document.getElementById("m7").value === "" ) {
                alert("Please enter a valid key - it was provided when the text was enciphered. ");
				return false;
            }
	
	var alph = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", " ", ".", "?"];
	var alength = alph.length;
	var text = document.getElementById("hill_text").value.toUpperCase();
	var textVector = [];
	var i = 0;
	for (var c=0; c<text.length; c++){
		for (var l = 0; l<alph.length; l++ in alph){
			if (text[c] === alph[l]){
				textVector[i] = l;  
				i++;
			}else{
				textVector[i] = 26;
			}
		}	
	}	
	var decipheredText = "";
	var decipheredVector= [];
	var decipheredMatrix = [];
	var encipheredMatrix = [];
	var matrixDepth;
	if(text.length > 3){
	   	matrixDepth = text.length/3;
	}else {
		matrixDepth = 1;
	}
	var realInversekey =[];
	for (var i = 0; i<3; i++){
		 realInversekey[i] = new Array(3);
		 }
	// assign values to realinversekey matrix
	realInversekey[0][0] = parseInt(document.getElementById("m1").value);
	realInversekey[0][1] = parseInt(document.getElementById("m2").value);
	realInversekey[0][2] = parseInt(document.getElementById("m3").value);
	realInversekey[1][0] = parseInt(document.getElementById("m4").value);
	realInversekey[1][1] = parseInt(document.getElementById("m5").value);
	realInversekey[1][2] = parseInt(document.getElementById("m6").value);
	realInversekey[2][0] = parseInt(document.getElementById("m7").value);
	realInversekey[2][1] = parseInt(document.getElementById("m8").value);
	realInversekey[2][2] = parseInt(document.getElementById("m9").value);
	var numberCheck;
	// two methods depending on whether 1 or more depth.
	if(matrixDepth === 1){	
		var k = 0;
		for(var i=0; i<3; i++){
			encipheredMatrix[i] = textVector[k];
			k++;
		}				
			
		// now to multiply the text matrix with the key matrix, we do it 1 vector of 3 at a time, and then the modulo of each element
		
		for(var j = 0; j<3; j++){
			numberCheck = 0;
			for(var i = 0; i<3;i++){
				numberCheck += (realInversekey[j][i] * encipheredMatrix[i]);
			}
			decipheredVector[j] = numberCheck%alength;
			//alert(numberCheck%alength);
			//alert(decipheredVector[j]);
			for (var l = 0; l<alength; l++){
				if(l === decipheredVector[j]){
					decipheredText += alph[l];
				}
			}	
		}	
		document.getElementById("invMat_text").innerHTML = "Deciphered text is: " + decipheredText;
	}else{
		// and here for matrices above 1 depth.
		for(var i = 0; i<3; i++){
			encipheredMatrix[i] = new Array(matrixDepth);
			decipheredMatrix[i] = new Array(matrixDepth);
		}
		// populte the array
		var k = 0;
		for(var j = 0; j < matrixDepth; j++){
			for(var i=0; i < 3; i++){
				encipheredMatrix[i][j] = textVector[k];
				k++;
			}	
		}	
		// now perform matrix mulitplication with the inverse key 
		for(var k = 0; k < matrixDepth; k++){
			for(var j = 0; j<3; j++){
				numberCheck = 0;
				for(var i = 0; i<3;i++){
					numberCheck += (realInversekey[j][i] * encipheredMatrix[i][k]);
				}
				decipheredMatrix[j][k] = numberCheck%alength;
				decipheredText += alph[decipheredMatrix[j][k]];
			}	
		}
		document.getElementById("invMat_text").innerHTML = "Deciphered text is: " + decipheredText + ". Any extra characters added to the end are because the length of the text needs to be a multiple of 3, so we add padding.";
	}
}

function vigenereEncipher(){
	if (document.getElementById("vigenere_text").value === "") {	// check for empty boxes
                alert("Please enter some text to encipher.");
				return false;
    } else if (document.getElementById("vigenere_key").value === "") {
                alert("Please enter a valid key.");
				return false;
            }
	if(document.getElementById("vigenere_text").value.length !== document.getElementById("vigenere_key").value.length){
		alert("Key must be the same length as the text you wish to encipher.");
		return false;
	}
	var alph = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var alength = alph.length;
	var text = document.getElementById("vigenere_text").value.toUpperCase();  // send to upper case so we can compare with our alphabet
	var key = document.getElementById("vigenere_key").value.toUpperCase();
	var encipheredText = "";
	var tabulaRecta = [];
	var tempChar1 = "";
	var tempChar2 = "";
	for (var i = 0; i < alength; i++){
		tabulaRecta[i] = new Array(alength);
	}
	// populate tabula recta
	for (var i = 0; i<alength; i++){
		for (var j = 0; j<alength; j++){
			tabulaRecta[i][j] = alph[j];
		}
		// then shift alphabet one for the next row.
		for(var l = 0; l<alength; l++){
			if(l === 0){
				tempChar1 = alph[0];
				alph[0] = alph[alength-1];
			}else{
				tempChar2 = alph[l];
				alph[l] = tempChar1;
				tempChar1 = tempChar2;
			}
			
		}
	}
	
	var index = 0;
	for(var i = 0; i<text.length; i++){
		for(var k = 0; k < alength; k++){
			if(text[i] === alph[k]){
				index = k;	
			}
		}
		for(var j = 0; j<alength; j++){
			if(key[i] === tabulaRecta[j][0]){
				encipheredText += tabulaRecta[j][index];	
			}		
		}
	}
	document.getElementById("vigenere_output").innerHTML = "Deciphered text is: " + encipheredText;
}
// vigenere decipher 
function vigenereDecipher(){
	if (document.getElementById("vigenere_text").value === "") {	// check for empty boxes
                alert("Please enter some text to decipher.");
				return false;
    } else if (document.getElementById("vigenere_key").value === "") {
                alert("Please enter a valid key.");
				return false;
            }
	if(document.getElementById("vigenere_text").value.length !== document.getElementById("vigenere_key").value.length){
		alert("Key should be the same length as the text you wish to decipher.");
		return false;
	}
	var alph = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var alength = alph.length;
	var text = document.getElementById("vigenere_text").value.toUpperCase();  // send to upper case so we can compare with our alphabet
	var key = document.getElementById("vigenere_key").value.toUpperCase();
	var decipheredText = "";
	var tabulaRecta = [];
	var tempChar1 = "";
	var tempChar2 = "";
	for (var i = 0; i < alength; i++){
		tabulaRecta[i] = new Array(alength);
	}
	// populate tabula recta
	for (var i = 0; i<alength; i++){
		for (var j = 0; j<alength; j++){
			tabulaRecta[i][j] = alph[j];
		}
		// then shift alphabet one for the next row.
		for(var l = 0; l<alength; l++){
			if(l === 0){
				tempChar1 = alph[0];
				alph[0] = alph[alength-1];
			}else{
				tempChar2 = alph[l];
				alph[l] = tempChar1;
				tempChar1 = tempChar2;
			}
			
		}
	}
	// now to decipher
	var index = 0;
	for(var i = 0; i<text.length; i++){
		for(var k = 0; k < alength; k++){
			if(key[i] === tabulaRecta[k][0]){
				index = k;	
			}
		}
		for(var j = 0; j<alength; j++){
			if(text[i] === tabulaRecta[index][j]){
				decipheredText += tabulaRecta[0][j];	
			}		
		}
	}
	document.getElementById("vigenere_output").innerHTML = "Deciphered text is: " + decipheredText;
}
	
function popHillKey(){
	document.getElementById("m1").value = 6;
	document.getElementById("m2").value = 24;
	document.getElementById("m3").value = 1;
	document.getElementById("m4").value = 13;
	document.getElementById("m5").value = 16;
	document.getElementById("m6").value = 10;
	document.getElementById("m7").value = 20;
	document.getElementById("m8").value = 17;
	document.getElementById("m9").value = 15;
}
