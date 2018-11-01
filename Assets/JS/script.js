"use strict";

var level = 1
var curBank = 'wordBank' + level;
var ans = "";
var ansArr = [];
var guessArr = [];
var score = 0;
var guessesRemain = 10;
var wrongLetters = [];
var guess;
var possGuesses = "qwertyuiopasdfghjklzxcvbnm";

var game = {    
    wordBank1: ["time","person","year","way","day","thing","man","world","life","hand",
        "part","child","eye","woman","place","work","week","case","point","government","company",
        "number","group","problem","fact","good","new","first","last","long","great","little","own",
        "other","old","right","big","high","different","small","large","next","early","young",
        "important","few","public","bad","same","able"],

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
        };
    },

    checkGuess: function() {
        if (ansArr.includes(guess)) {
            for (var i = 0; i < ansArr.length; i++) {
                if (ansArr[i] === guess) {
                    guessArr[i] = guess;
                };
            };
        } else {
            if (wrongLetters.includes(guess)) {
                console.log("You already tried this guess");
            } else {
                wrongLetters.push(guess);
                --guessesRemain;
            };
        };
    },

    updateUI: function() {
        document.getElementById("ans").textContent = "Answer: " + ans;
        document.getElementById("guess").textContent = "Current Guess: " + guessArr.join(" ");
        document.getElementById("score").textContent = "Score: " + score;
        document.getElementById("guessesRemain").textContent = "Remaining Guesses: " + guessesRemain;
        document.getElementById("wrongLetters").textContent = "Incorrect Guesses: " + wrongLetters.join(",");
    },
    
    newGame: function() {
        game.init();
        game.chooseWord();
        game.updateGuessArr();
        game.updateUI();
    },

    win: function() {
        ++score;
        game.chooseWord();
        game.updateGuessArr();
        game.updateUI();
    },

    endGame: function () {
        console.log("Better luck next time!");
    },

    init: function() {
        level = 1
        curBank = 'wordBank' + level;
        ans = "";
        ansArr = [];
        guessArr = [];
        score = 0;
        guessesRemain = 10;
        wrongLetters = [];
        guess;
    },

    continuePlay: function() {
        if (guessesRemain > 0) {
        game.checkGuess();
        game.updateUI();
        } else {
            game.endGame();
        }
    },
         
  }
 
  
document.getElementById("newGame").addEventListener("click", game.newGame); 

document.onkeypress = function(event) {
    guess = event.key.toLowerCase();
    if (possGuesses.includes(guess)) {
        if (guessArr.join("") === ans) {
        game.win();
        } else {
        game.continuePlay(); 
        };
    };
};




// var wordBank2 = ["Awkward","Bagpipes","Banjo","Bungler","Croquet","Crypt","Dwarves",
// "Fervid","Fishhook","Fjord","Gazebo","Gypsy","Haiku","Haphazard","Hyphen","Ivory",
// "Jazzy","Jiffy","Jinx","Jukebox","Kayak","Kiosk","Klutz","Memento","Mystify",
// "Numbskull","Ostracize","Oxygen","Pajama","Phlegm","Pixel","Polka","Quad","Quip",
// "Rhythmic","Rogue","Sphinx","Squawk","Swivel","Toady","Twelfth","Unzip","Waxy","Wildebeest",
// "Yacht","Zealous","Zigzag","Zippy","Zombie"];



//still left to do: levels