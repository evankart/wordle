"use strict";
import wordLists from "/wordbank.js";

/*
 * --------------- 1. DEFINE VARIABLES -------------------//
 *
 * --- Hidden Word Variables ---//
 */
let randomIndex = Math.floor(Math.random() * wordLists.wordBank.length);
let hiddenString = wordLists.wordBank[randomIndex].toLowerCase(); // pick random word
let targetBox;
let letterIndex;
//--- Guessed Word Variables ---//
let guessString = ""; // start with empty guess
let guessDict = {}; // Blank dictionary of guessed letters

//--- Tracking numbers of guesses and rows ---//
let guesses = 0; // Starting at guess count of 0
let currentRow = 1; // Starting in row #1
let rowID = "row" + currentRow;

//---------------- 2. ADD EVENT LISTENERS -----------------//

//--- Create constants for boxes and keyboard keys ---//
const boxes = document.querySelectorAll(".box"); // boxes = all of the boxes on the board
const letterKeys = document.querySelectorAll(".letterKey"); // keys = all of the keyboard keys
const deleteKey = document.querySelector(".deleteKey"); // deleteKey
const enterKey = document.querySelector(".enterKey"); // enter key

//--- When letter key is pressed, add it to the next open box ---//
letterKeys.forEach((item) => {
  item.addEventListener("click", (event) => {
    if (guessString.length < 5) {
      // only allow adding letters if the word is less than 5 letters long
      targetBox = document.querySelector(".box:empty"); // sets the target to the next open box
      targetBox.innerHTML = item.innerHTML; // places selected letter in the target box
      guessString = guessString.concat(item.innerHTML.toLowerCase()); // adds letter to the end of current guess
    }
  });
});

//--- Adds keyboard functionality ---//
window.addEventListener(
  "keydown",
  function (e) {
    for (let i = 0; i < letterKeys.length; i++) {
      if (`${e.key}` == letterKeys[i].innerHTML.toLowerCase()) {
        letterKeys[i].click();
      }
    }
    if (`${e.key}` == "Backspace") {
      deleteLetter();
    } else if (`${e.key}` == "Enter") {
      if (guessString.length === 5) {
        validateGuess();
      } else {
        alert("Please enter a five letter word.");
      }
    }
  },
  false
);

//--- Run the validateGuess function when Enter is pressed ---//
enterKey.addEventListener("click", validateGuess);

//--- Run the delterLetter function when Delete is pressed ---//
deleteKey.addEventListener("click", deleteLetter);

//---------------- 3. DEFINE FUNCTIONS -----------------//

//--- Check whether the word is correct ---//
function validateGuess() {
  if (
    // if word is not a legal guess
    !(
      wordLists.wordBank.indexOf(guessString) !== -1 ||
      wordLists.legalWords.indexOf(guessString) !== -1
    )
  ) {
    alert("Please enter a legal word");
  } else {
    // if word is a legal guess, update the colors
    updateBoxColors();
    guesses++;
    currentRow++;
    rowID = "row" + currentRow;
  }

  if (guesses >= 6) {
    if (guessString !== hiddenString) {
      alert(`Better luck next time! The word was: ${hiddenString}`);
    }
    resetGame();
  }
}

//--- Add colors to the guessed letters in the grid ---//
function updateBoxColors() {
  let row = document.getElementById(rowID);
  let spaces = row.children;
  let tally = {};

  for (let i = 0; i < spaces.length; i++) {
    let currentSquare = spaces[i];
    let currentLetter = currentSquare.innerHTML.toLowerCase();
    tally[currentLetter] = 0;
    if (currentLetter === hiddenString[i]) {
      spaces[i].classList.add("green");
      tally[currentLetter]++;
    }
  }

  // For each box in the current guess
  for (let k = 0; k < spaces.length; k++) {
    let currentSquare = spaces[k];
    let currentLetter = currentSquare.innerHTML.toLowerCase();

    let hiddenLtrCount = hiddenString.split(currentLetter).length - 1;

    if (hiddenString.includes(currentLetter)) {
      if (tally[currentLetter] < hiddenLtrCount) {
        if (currentLetter === hiddenString[k]) {
          currentSquare.classList.add("green");
        } else {
          currentSquare.classList.add("yellow");
        }
      } else {
        currentSquare.classList.add("gray");
      }
    } else if (!hiddenString.includes(currentLetter)) {
      currentSquare.classList.add("gray");
    }

    tally[currentLetter]++;
    // console.log("tally", tally);
  }
  updateKeyColors();
}

//--- Add colors to the keyboard keys ---//
function updateKeyColors() {
  for (let y in guessString) {
    letterKeys.forEach((item) => {
      let currentKey = item.innerHTML.toLowerCase();
      if (currentKey === guessString[y] && guessString[y] === hiddenString[y]) {
        item.classList.add("green");
      } else if (
        currentKey === guessString[y] &&
        hiddenString.includes(currentKey)
      ) {
        item.classList.add("yellow");
      } else if (guessString.includes(currentKey)) {
        item.classList.add("gray");
      }
    });
  }
  if (guessString === hiddenString) {
    setTimeout(resetGame, 100);
  } else {
    guessString = ""; // reset guess string for next guess
  }
}

//--- Handle deleting a letter from the guess and board when the delete key is pressed ---//
function deleteLetter() {
  if (guessString.length > 0) {
    letterIndex = guessString.indexOf(targetBox.innerHTML);
    if (letterIndex > -1) {
      // only splice String when item is found
      guessString.splice(letterIndex, 1); // 2nd parameter means remove one item only
    }
    targetBox.innerHTML = ""; // delete the last letter added
    targetBox = targetBox.previousElementSibling; // changes the target box to previous letter added
    guessString = guessString.slice(0, -1); // keeps all but the last letter of your guess
  }
}

//--- Clear the board everything to original state ---//
function resetGame() {
  if (guessString === hiddenString) {
    alert("Yay you did it!");
    guessString = "";
  }
  boxes.forEach((item) => {
    item.innerHTML = ""; // clears the previous guesses from the board

    item.classList.remove("gray", "green", "yellow"); // removes background colors form boxes on the board
  });
  guessString = ""; // resets the current guess to ""
  randomIndex = Math.floor(Math.random() * wordLists.wordBank.length);
  hiddenString = wordLists.wordBank[randomIndex].toLowerCase(); // changes the hidden word to a new word

  guesses = 0; // resets the number of guesses to zero for new round
  currentRow = 1; // Starting in row #1
  rowID = "row" + currentRow;
  letterKeys.forEach((item) => {
    item.classList.remove("gray", "green", "yellow"); // resets keyboard background color
  });
}
