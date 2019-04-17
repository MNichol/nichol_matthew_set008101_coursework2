/* 
	Coursework 1 Code Slightly Adapted in Places
													*/

//Function is for encrypting a message using ATBASH cipher
function bash_encrypt() {
	
	//Create an empty string for the encrypted message to be stored
	var solved = "";
	
	//Get message from user and force it to uppercase for the purpose of conversion
	var usermsg = document.getElementById("u_message").value;
	var usermsgCAP = usermsg.toUpperCase();

	//Loop through each character in the user message 
	for (var i = 0; i < usermsg.length; i++) {
		
		//Get the current message character for later use 
		var msgchar = usermsg[i];
		// Get the current ascii code from the uppercase user message 
		var asciicode = usermsgCAP[i].charCodeAt();
		
		//Check if the asciicode is within the the ascii code range for capital letters
		if (asciicode >= 65 && asciicode <= 90) {
			//If the ascii code is within the capital letters range, do the following calculation
			solved += String.fromCharCode(asciicode + (90 - asciicode - (asciicode - 65)))
		//If the ascii code is not within the capital letters range, just pass the chracter on (assumed to be special i.e @;., 
    } 	else {
		solved += msgchar;
    }
  }
  //Display the solved variable to the Output section of the html page
  document.getElementById("Output").innerHTML = solved;
}


//Ceasar function for encrypting user message
function caesarcipher() {
	
	//Create an empty string for later adding the solved message into 
	var solved = "";
	
	//Create a variable that is used as an array for indexing between letters
	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	
	//Get message from Input boxes on webpage and force the input to uppercase 
	var message_in = document.getElementById("u_message").value;
	var message_caps = message_in.toUpperCase();
	
	//Get shift ammount from input boxes on webpage and force them to integer for later calculations
	var shift_string = document.getElementById("u_shift").value;
	var shift_integer = parseInt(shift_string);
	//Dividing the shift key by 26 allows for higher shift keys from the user
	var shift_integer = shift_integer % 26;
	
	
	//Loop through the entire message to calculate each new character substitution
	for(var i = 0; i< message_caps.length; i++) {
		
		//Variable is created for indexing and adding to the solved variable in case of special characters
		var msgchar= message_caps[i];
		
		//Check if the msgcharcurrently stored is a space to keep user messages readable
		if (msgchar=== ' ') {
			solved += msgchar;
			continue;
		}
		
		//Gets the index of the current letter
		var current_num = alphabet.indexOf(msgchar);
		var current_num_int = parseInt(current_num)
		
		//Gets new index integer from adding previous index and the shift variable
		var new_num = current_num_int + shift_integer;
		var new_num_int = parseInt(new_num)
		
		/*Checking if the new index number will be higher or lower than the min max of the alphabet string (min 0 / Max 25) if they go under/over, 
		account for this to show a looping effect on the alphabet */ 
		if(new_num_int <0) {
			new_num_int = new_num_int + 26;
		} else if(new_num_int > 25) {
			new_num_int = new_num_int - 26;
		} else {
		}
		
		//Add the encoded letter to the solved string
		solved += alphabet[new_num_int];
	}
	//Display the encoded message to the Output area
	document.getElementById("Output").innerHTML = solved;

	check(solved);
}


//Ceasar Function for decrypting user message
function caesarcipher_decrypt() {
	//Create an empty string for later adding the solved message into 
	var solved = "";
	
	//Create a variable that is used as an array for indexing between letters
	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	
	//Get message from Input boxes on webpage and force the input to uppercase 
	var message_in = document.getElementById("u_message").value;
	var message_caps = message_in.toUpperCase();
	
	//Get shift ammount from input boxes on webpage and force them to integer for later calculations
	var shift_string = document.getElementById("u_shift").value;
	var shift_integer = parseInt(shift_string);
	
	//Dividing the shift key by 26 allows for higher shift keys from the user
	var shift_integer = shift_integer % 26;
	
	
	//Loop through the entire message to calculate each new character substitution
	for(var i = 0; i< message_caps.length; i++) {
		
		//Variable is created for indexing and adding to the solved variable in case of special characters
		var msgchar = message_caps[i];
		
		//Check if the msgcharcurrently stored is a space to keep user messages readable
		if (msgchar=== ' ') {
			solved += msgchar;
			continue;
		}
		
		//Gets the index of the current letter
		var current_num = alphabet.indexOf(msgchar);
		var current_num_int = parseInt(current_num);
		
		//Gets new index integer from adding previous index and the shift variable
		var new_num = current_num_int - shift_integer;
		var new_num_int = parseInt(new_num);
		
		/*Checking if the new index number will be higher or lower than the min max of the alphabet string (min 0 / Max 25) if they go under/over, 
		account for this to show a looping effect on the alphabet */
		if(new_num_int <0) {
			new_num_int = new_num_int + 26;
		} else if(new_num_int > 25) {
			new_num_int = new_num_int - 26;
		} else {
		}
		 //Add the decoded letter to the solved string
		solved += alphabet[new_num_int];
	}
	//Display the decoded message to the Output area 
	document.getElementById("Output").innerHTML = solved;

	check(solved);
}

function rot13() {
	
	//Create an empty string for the encrypted message to be stored
	var solved = "";
	
	//Get message from user and force it to uppercase for the purpose of conversion
	var usermsg = document.getElementById("u_message").value;
	var usermsgCAP = usermsg.toUpperCase();

	//Loop through the user message to calculate the encrypted/decrypted message
	for (var i = 0; i < usermsg.length; i++) {
		
		//Get the current message character for later use 
		var msgchar = usermsg[i];
		
		// Get the current ascii code from the uppercase user message
		var asciicode = usermsgCAP[i].charCodeAt();
		
		//If the ascii code provided is between 65 - 77 then add 13 to the asciicode variable and add it to the solved variable
		if (asciicode >= 65 && asciicode <= 77) {
			solved += String.fromCharCode(asciicode + 13);
		//If the ascii code provided is between 78 - 90 then minus 13 to the asciicode variable and add it to the solved variable
    } 	else if (asciicode >= 78 && asciicode <= 90) {
			solved += String.fromCharCode(asciicode - 13);
		//If the asciicode doesn't match any of the previous ranges, just add the current character to the solved variable
    } 	else {
		solved += msgchar;
	}
  }
  //Display the users encoded/decoded message to the Output area on the webpage 
  document.getElementById("Output").innerHTML = solved

  check(solved);
}


/* 
	Coursework 2 Code 
						*/

function cipherselect() {
	var u_cipher = document.getElementById('cipherlist').value


	if (u_cipher == "ROT13"){
		document.getElementById('Encrypt').innerHTML = '';
		document.getElementById('Decrypt').innerHTML = '';

		document.getElementById('Encrypt/Decrypt').innerHTML = '<button onclick="rot13()">Encrypt/Decrypt"</button>';
	} else if (u_cipher =="CAESAR"){
		document.getElementById('Encrypt/Decrypt').innerHTML = ''

		document.getElementById('caesar_shift').innerHTML = '<textarea rows = "1" cols ="50" autofocus id="u_shift" placeholder ="Type your shift number here (between 0 and 13)"></textarea>'

		document.getElementById('Encrypt').innerHTML = '<button onclick="caesarcipher()">Encrypt';
		document.getElementById('Decrypt').innerHTML = '<button onclick="caesarcipher_decrypt()">Decrypt';	
	} else if (u_cipher == "ATBASH"){
		document.getElementById('Encrypt').innerHTML = '';
		document.getElementById('Decrypt').innerHTML = '';

		document.getElementById('Encrypt/Decrypt').innerHTML = '<button onclick="bash_encrypt()">Encrypt/Decrypt';
	} else {
		console.log('Error in fetching ciphers')
	};
};

function check(solved) {

	var plain = document.getElementById('u_message').value

	var u_cipher = document.getElementById('cipherlist').value
	if(u_cipher =="CAESAR"){
		var u_shift = document.getElementById('u_shift').value
	} else {
		var u_shift = null;
	}

	document.getElementById('request').innerHTML = "<p>Send this message to a user on the site! Type their username in and we'll use our network of spies to get the message to them. Make sure to sign your message, all messages are sent anonimously</p>"
	document.getElementById('Sender').innerHTML = '<input rows="1" cols="50" name="recipiant" placeholder="Enter Recipiant Here">'
	document.getElementById('body').innerHTML = '<input rows="1" cols="50" name="body" value="'+ solved + '">'
	document.getElementById('plain').innerHTML = '<input type="hidden" rows="1" cols="50" name="plain" value="'+ plain + '">'
	document.getElementById('cipher').innerHTML= '<input type="hidden" rows="1" cols="50" name="cipher" value="'+ u_cipher + '">'
	document.getElementById('shift').innerHTML = '<input type ="hidden" rows="1" cols="50" name ="shift" value ="'+ u_shift + '">'
	document.getElementById('send').innerHTML = '<input type="Submit" value="Send that message!">'
}
