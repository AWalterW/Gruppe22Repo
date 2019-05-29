let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

let counter;
let word;
let guess;
let guesses = [];
let lives;
let counter;
let space;

let buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

for (i = 0; i < alphabet.length; i++) {
    letters.id = 'alphabet';
    list = document.createElement('li');
    list.id = 'letter';
    list.innerHTML = alphabet[i];
    check();
    myButtons.appendChild(letters);
    letters.appendChild(list);
}

// Play
play = function () {
    playWord = [
        "norge", "mummitroll", "hettegenser", "iphone", "høyskolen-kristiania" 
    ];

    
    word = playWord[Math.floor(Math.random() * playWord.length)];
    console.log(word);
    buttons();

    guesses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
  }

play();
