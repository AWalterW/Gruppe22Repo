

let words = ["norge", "iphone", "mobil", "hei" , "stol", "hode", "maskin",
"tre", "zebra", "farge", "male", "senior", "stein", "lader", "teip", "Tavle", "herlig" ];

// Pick random words from the words array
let word = words[Math.floor(Math.random()) * words.length] 

// Setting up Answer array 
let answerArray = [];
for (let i = 0; i < words.length; i++ ){
    answerArray[i] = "_"
}

// setting up remaining letters to be guessed
let remainingLetters = word.length; 

                                    // The game \\

// while letters left to be guesses
while (remainingLetters > 0) {
    // player progress
    alert(answerArray.join(" ")); 

    // guess from player
    let guess = prompt("Guess a letter, or click cancel to exit");

    // if the guess is blank from player
    if (guess === null){
        //Exit the game loop
        break;
    // if the guess is more than one letter or none
    } else if (guess.length !== 1){
        // alert the player to only guess one letter at time
        alert("Please guess one letter at time");
        // right guess
    } else { 
        // update the game with the guessed letter
        for (let j = 0; j < word.length; j++){
            /*if the letter was guessed was in the word at point  or index*/ 
            if (word[j] === guess){
                // update the word they guessed at the point or the index
                answerArray[j] = guess;
                // remove one from remaining letters
                remainingLetters--;
            }
        }
    }
                            // End game \\
}

// Let player know the word
alert(answerArray.join(" "));
// when player wins
alert("WOW, You are a winner!" + " " + word);
