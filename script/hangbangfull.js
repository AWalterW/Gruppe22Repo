
//Computer picks random word to guess
function getItem() {
    //Possible words to guess
    var words = ['jason', 'kaitlyn', 'lora', 'matthew'];
    document.getElementById("wordGuess").innerHTML = words[Math.floor(Math.random() * words.length)];

    var progressWord = []
for (var i = 0; i < wordLength; i ++)
  progressWord.push('-');
  
    //Displays possible words blank spaces
    var possibleWord = "J A S O N";
    var blankSpaces = "";
    var wordLength = possibleWord.length;
  
    for (i = 0; i < wordLength; i++) {
      var x = possibleWord.charAt(i);
  
      if (x === " " || x === "/'") {
        blankSpaces += x;
      } else {
        blankSpaces += "_";
      }
    }
    document.getElementById("blankSpaces").innerHTML = blankSpaces;
  }
  
  //This code captures the keypress and prints it out on the screen
  var guessesLeft = 9;
  
  document.onkeypress = function(keyPressed) {
    var keyPressed = keyPressed || window.event,
      charCode = keyPressed.keyCode || keyPressed.which,
      lettersGuessed = String.fromCharCode(charCode);
      
      if (chosenWord.indexOf(keyString) != -1){ // if the character is found
        for (var i = 0; i < wordLength; i ++){ // loop on all characters
           if (chosenWord[i] == keyString) // if this is an occurance
             progressWord[i] = chosenWord[i];
        }
      }else{
        // wrong choice
      }
  
    // var userGuess = prompt("What word do you guess?");
    // var userGuess = words.split('');
    // var userGuess
    // if (words.indexOf(userGuess) > -1) {
    // 	alert("Your guess is correct.")
    // }else {
    // 	alert("Your guess is wrong.")
    // }
  
    document.getElementById("lettersGuessed").innerHTML += lettersGuessed;
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
  
    guessesLeft--;
  
    if (guessesLeft === -1) {
      alert("You Loose!");
    }
  }