

let words = ["norge", "iphone", "mobil", "hei" , "stol", "hode", "maskin",
"tre", "zebra", "farge", "male", "senior", "stein", "lader", "teip", "Tavle", "herlig" ];

	// this picks random words for you
	var word = words[Math.floor(Math.random() * words.length)];
	//setting up a answer array
	var answerArray = [];
	for (var i = 0; i < word.length; i++){
		answerArray[i] = "_";
	}
	var remainingLetters = word.length;
	var remainingGuesses = word.length;
	var guessed = false;
                            
                                        // The game loop \\

	while (remainingLetters > 0 && remainingGuesses > 0) {
		// Progress of the player
		alert(answerArray.join(' '));
		// getting an guessed letter from player
		var guess =  document.getElementById()   
		//prompt("Guess a letter to start the game, to exit press CANCEL").toLowerCase();
			
		if (guess === null)
		{
			break;
		} else if (guess.length !== 1){
			alert("Please enter one letter at a time");
		} else {
			// Updating the game state
			 guessed = false;
			for(j = 0; j < word.length; j++){
				if(guess === word[j] && answerArray[j] === "_") {
					answerArray[j] = word[j];
					word[j] = word[j].toUpperCase();
					guessed = true;
					remainingLetters--;
				}
			}
			if (!guessed){
				remainingGuesses--;
			}
		}
	}
	if (!guessed) {
        // loosing the game
		alert("Game lost!");
		alert("Better luck next time!");
		} else {
		// winning the game
		alert(answerArray.join(" "));
		alert("You are a winner " + word);
	}

	