'use strict';

var cameraWords =           // Word list
    [
        "polaroid",
        "kodak",
        "leica",
        "pentax",
        "fujifilm",
        "nikon",
        "canon",
        "rolleiflex",
        "brownie",
        "diana",
        "olympus",
    ];

const maxTries = 12;            // Maximum number of tries 

var lettersGuessed = [];        // Stores the letters guessed
var currentWord;                // List of the words in the array
var guessingWord = [];          // This will be the word we actually build to match the current word
var remainingGuesses = 0;       // How many tries left
var gameStarted = false;        // Tell if the game has started
var hasFinished = false;        // Alert -- 'press any key to try again'     
var wins = 0;                   // Number of wins
var correctLetter = false;      // If correct letter is found

// Game Sounds

    var keySound = new Audio('./assets/sounds/rightanswer.mp3');
    var winSound = new Audio('./assets/sounds/cheers.mp3');
    var loseSound = new Audio('./assets/sounds/wronganswer.mp3');


//Reset game

function resetGame() {
    remainingGuesses = maxTries;
    console.log("reset")

// Math?
    //Number of the index not the word it self
    currentWord = Math.floor(Math.random() * (cameraWords.length));
    console.log("currentWord: "+ cameraWords[currentWord]);
// Clear out arrays

lettersGuessed = [];
guessingWord = [];

// Make sure the camera image is cleared
    document.getElementById("cameraImage").src = "";


// Build the guessing word and clear it out
    for (var i = 0; i < cameraWords[currentWord].length; i++) {
        guessingWord.push("_");
    }  
        console.log("loop" + guessingWord)

// Show display
updateDisplay();
};

//  Updates the display on the HTML Page
    function updateDisplay() {

        document.getElementById("totalWins").innerText = wins;

        console.log("win" + wins)

        document.getElementById("currentWord").innerText = guessingWord.join(" ");
        console.log("guessingWord: " + guessingWord.join(" "));
        document.getElementById("remainingGuesses").innerText = remainingGuesses;
        console.log("remainingGuesses: " + remainingGuesses);
        document.getElementById("lettersGuessed").innerText = lettersGuessed;
        console.log("lettersGuessed: " +lettersGuessed);

    };

    // Updates the image camera photo according to winning word
function updatecameraImage() {
    document.getElementById("cameraImage").src = "assets/images/" + cameraWords[currentWord] + ".jpg";
};

// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    // var positions = [];
    console.log("In evalu Guess")

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < cameraWords[currentWord].length; i++) {
        if((cameraWords[currentWord][i].toUpperCase()) === letter) {
            console.log("Correct letter was found");
            correctLetter = true;
            // positions.push(i);
            guessingWord[i]=letter
            console.log("after correct guessingWord: " + guessingWord);
            // boolean
            keySound.play();
        }
    }

    // if boolean remainingGuesses greater than 0 then --1
    if(correctLetter === false) {
        remainingGuesses--;
        makeGuess(letter);
    }

    correctLetter=false;
    loseSound.play();
    
};

    
// Checks for a win by seeing if there are any remaining underscores in the guessingword we are building.
    function checkWin() {
        if(guessingWord.indexOf("_") === -1) {
            // document.getElementById("youwin-image").style.cssText = "display: block";
            // document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
            wins++;
            document.getElementById("currentWord").innerText = guessingWord.join(" ");
            
            winSound.play();
            updatecameraImage();
            hasFinished = true;
            }
    };


// Checks for a loss
function checkLoss()
{
if(remainingGuesses == 0) {
    resetGame();
    alert("YOU LOSE!")
// loseSound.play();
// document.getElementById("gameover-image").style.cssText = "display: block";
document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
hasFinished = true;
}
}
    console.log("dekho")
// Makes a guess
        function makeGuess(letter) {
        console.log("In makeGuess letter: " + letter);
    
        if (remainingGuesses > 0) {
    // Make sure we didn't use this letter yet
        if (lettersGuessed.indexOf(letter) === -1) {
            console.log("Letter was not guessed before");
            lettersGuessed.push(letter);
            // evaluateGuess(letter);
        }
    }

};
console.log("medanam")


// Event listener
document.onkeydown = function(event) {
    console.log("maxTries: " + maxTries );

    // If we finished a game, dump one keystroke and reset.
        if(hasFinished) {
            resetGame();

            hasFinished = false;
            
        } 
        
        else {
            // Check to make sure a-z was pressed.
            if(event.keyCode >= 65 && event.keyCode <= 90) {
                // keySound.play();
                // var guessingword = String.fromCharCode(event.keyCode).toUpperCase();
                console.log("inside keycode");
                evaluateGuess(event.key.toUpperCase());
                console.log("after makeGuess")
                updateDisplay();
                console.log("after updateDisplay")
                checkWin();
                console.log("after checkWin")
                checkLoss();
                console.log("after checkLoss")


            }
        }
};





