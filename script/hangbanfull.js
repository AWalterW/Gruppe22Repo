


(function () {
    var availableLetters;
    var words;
    var guessInput;
    var guess; 
    var guessButton; 
    var lettersGuessed;
    var lettersMatched; 
    var output; 
    var man;
    var letters;
    var lives;
    var currentWord;
    var numLettersMatched;
    var messages;

    function setup() {
        availableLetters = "abcdefghijklmnopqrstuvwxyzæøå";
        lives = 5;
        words = ["norge", "harald", "herlighet", "troll", "viking", "skandinavia", ""];
        messages = {
            win: "You did it!",
            lose: "Better try next time!",
            guessed: "you have already guessed that..",
            validLetter: "Please enter a letter from A-Å"
        };

        lettersGuessed = lettersMatched = "";
        numLettersMatched = 0;

        currentWord = words[Math.floor(Math.random() * words.length)];

        output = document.getElementById("output");
        man = document.getElementById("man");
        guessInput = document.getElementById("letter");

        man.innerHTML = " You have " + lives + " tries left";
        output.innerHTML = '';

        document.getElementById("letter").value = '';

        guessButton = document.getElementById("guess");
        guessInput.style.display = 'inline';
        guessButton.style.display = 'inline';

        letters = document.getElementById("letters");
        letters.innerHTML = '<li class="current-word">Current word:</li>';

        var letter, i;
        for (i = 0; i < currentWord.length; i++) {
            letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
            letters.insertAdjacentHTML('beforeend', letter);
        }
    }

    function gameOver(win) {
        if (win) {
            output.innerHTML = messages.win;
            output.classList.add('wins!');
        } else {
            output.innerHTML = messages.lose;
            output.classList.add('error');
        }

        guessInput.style.display = guessButton.style.display = 'none';
        guessInput.value = '';
    }

    window.onload = setup();

    document.getElementById("restart").onclick = setup;

    guessInput.onclick = function () {
        this.value = '';
    };

    document.getElementById("hangBan").onsubmit = function (e) {
        if (e.preventDefault) e.preventDefault();
        output.innerHTML = "";
        output.classList.remove('error', 'warning');
        guess = guessInput.value;

        if (guess) {
            if (availableLetters.indexOf(guess) > -1) {
                if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
                    output.classList.add("warning");
                }
                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }

                    for (var j = 0; j < currentWord.length; j++) {
                        if (currentWord.charAt(j) === guess) {
                            numLettersMatched += 1;
                        }
                    }

                    lettersMatched += guess;
                    if (numLettersMatched === currentWord.length) {
                        gameOver(true);
                    }
                }
                else {
                    lettersGuessed += guess;
                    lives--;
                    man.innerHTML = 'Ouch! You have ' + lives + ' tries left';
                    if (lives === 0) gameOver();
                }
            }
            else {
                output.classList.add('error');
                output.innerHTML = messages.validLetter;
            }
        }
        else {
            output.classList.add('error');
            output.innerHTML = messages.validLetter;
        }
        return false;
    };
}());