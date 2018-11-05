"use strict";


var ans = "";
var ansArr = [];
var guessArr = [];
var score = 0;
var guessesRemain = 10;
var wrongLetters = [];
var guess;
var possGuesses = "qwertyuiopasdfghjklzxcvbnm";


var game = {    
    wordBank1: ["acorn","apple","autumn","chestnuts","cider","cobweb","cold","corn","cornucopia",
        "fall","feast","harvest","haystack","jackey","leaves","pumpkin","pie","scarecrow","squash",
        "stuffing","thanksgiving","turkey"],

    randNum: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; 
    },

    chooseWord: function () {
        wrongLetters = [];
        guessArr = [];
        ans = this.wordBank1[this.randNum(0, this.wordBank1.length)];
        ansArr = ans.split('');
    },
    
    updateGuessArr: function () {
        for (var i = 0; i < ansArr.length; i++){
            guessArr[i] = "_"
        }
    },

    checkGuess: function() {
        if (ansArr.includes(guess)) {
            for (var i = 0; i < ansArr.length; i++) {
                if (ansArr[i] === guess) {
                    guessArr[i] = guess;
                };
            }
            if (guessArr.join("") === ans) {
                game.win();
            } 
        } else {
            if (wrongLetters.includes(guess)) {
                alert("You already tried that letter.");
            } else {
                wrongLetters.push(guess);
                --guessesRemain;
            }
        }
    },

    updateUI: function() {
        document.getElementById("guess").textContent = guessArr.join(" ");
        document.getElementById("score").textContent = "Score: " + score;
        document.getElementById("guessesRemain").textContent = "Remaining Guesses: " + guessesRemain;
        document.getElementById("wrongLetters").textContent = "Incorrect Guesses: " + wrongLetters.join(",");
        document.getElementById("message").textContent = "";
    },
    
   
    win: function() {
        score++;
        guessesRemain = 10;
        this.chooseWord();
        this.updateGuessArr();
        this.updateUI();
        
    },

    endGame: function() {
        alert("Sorry, the answer was: " + ans + ". Better luck next time!");
    },

    init: function() {
        ans = "";
        ansArr = [];
        guessArr = [];
        score = 0;
        guessesRemain = 10;
        wrongLetters = [];
        guess;
    },

    newGame: function() {
        game.init();
        game.chooseWord();
        game.updateGuessArr();
        game.updateUI();
    },

         
}
 
  
document.getElementById("newGame").addEventListener("click", game.newGame); 

document.onkeypress = function(event) {
    guess = event.key.toLowerCase();
    if (possGuesses.includes(guess)) {
        if (guessesRemain > 0) {
            game.checkGuess();
            game.updateUI();
        } else {
            game.endGame();
        };
    };
};






