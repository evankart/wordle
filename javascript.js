const wordBank = [
  "Amber",
  "Ashen",
  "Azure",
  "Beige",
  "Black",
  "Blond",
  "Blush",
  "Brown",
  "Coral",
  "Cream",
  "Dusky",
  "Ebony",
  "Flame",
  "Green",
  "Hazel",
  "Henna",
  "Ivory",
  "Khaki",
  "Lemon",
  "Lilac",
  "Livid",
  "Mauve",
  "Milky",
  "Mocha",
  "Mousy",
  "Ochre",
  "Olive",
  "Pansy",
  "Peach",
  "Pearl",
  "Rouge",
  "Ruddy",
  "Sable",
  "Sandy",
  "Sepia",
  "Smoky",
  "Snowy",
  "Sooty",
  "Steel",
  "Straw",
  "Taupe",
  "Tawny",
  "Topaz",
  "Umber",
  "Wheat",
  "White",
];

// --------- TO DO ------------

// TO DO: Don't show duplicate yellow sqares if letter is only in the word once

// 1. DEFINE VARIABLES

let randomIndex = Math.floor(Math.random() * wordBank.length);

// let hiddenWord = wordBank[randomIndex].toLowerCase(); // pick random word

let hiddenWord = "break";

let guessedWord = ""; // Blank starting guess

let guesses = 0; // Staerting at guess number 0

const boxes = document.querySelectorAll(".box"); // boxes = all of the boxes on the board

const letterKeys = document.querySelectorAll(".letterKey"); // keys = all of the keyboard keys

const deleteKey = document.querySelector(".deleteKey"); // deleteKey

const enterKey = document.querySelector(".enterKey"); // enter key

// 2. ADD EVENT LISTENERS

// When a letter is pressed (and current guess is <5 chars) find the next open box, add the letter to it, darken the key bg color, and add the letter to the current guess.
letterKeys.forEach((item) => {
  item.addEventListener("click", (event) => {
    if (guessedWord.length < 5) {
      // only allow adding letters if the word is less than 5 letters long
      targetBox = document.querySelector(".box:empty"); // sets the target to the next open box
      targetBox.innerHTML = item.innerHTML; // places selected letter in the target box
      item.classList.add("dark");
      guessedWord = guessedWord.concat(item.innerHTML.toLowerCase()); // adds letter to the end of current guess
      console.log(guessedWord);
    }
  });
});

// When enter key is pressed - run the checkGuess function
enterKey.addEventListener("click", checkGuess);

// When delete key is pressed - run the deleteLetter function
deleteKey.addEventListener("click", deleteLetter);

// 3. DEFINE FUNCTIONS

// FUNCTION: Check if the word is correct when clicking enter
function checkGuess() {
  if (guessedWord.length == 5) {
    // Checks that guess is 5 letters long
    if (guessedWord.toLowerCase() === hiddenWord.toLowerCase()) {
      // Check if the guessed word is correct
      youWin();
    } else {
      console.log("Not this time!");
    }
    guessedWord = "";
    guesses++;

    addColors();
  } else {
    console.log("Please enter a five letter word."); // If guess is not 5 letters long, promts the user
  }

  if (guesses >= 6) {
    alert("Better luck next time!");
    resetGame();
  }
}

// TO DO: Split up board and guesses by rows

//FUNCTION: Change relevant squares to green or yellow
function addColors() {
  let j = 0;
  let yellow = 0;
  boxes.forEach((item) => {
    if (item.innerHTML != "") {
      if (item.innerHTML.toLowerCase() == hiddenWord[j]) {
        item.classList.add("green");
      } else if (hiddenWord.includes(item.innerHTML.toLowerCase())) {
        let hiddenInstances =
          hiddenWord.split(item.innerHTML.toLowerCase()).length - 1;

        let guessInstances =
          hiddenWord.split(item.innerHTML.toLowerCase()).length - 1;
        console.log(
          item.innerHTML + " appears " + guessInstances + " times in your guess"
        );
        console.log(
          item.innerHTML +
            " appears " +
            hiddenInstances +
            " times in the hidden word"
        );

        item.classList.add("yellow");

        // if (yellow < hiddenInstances) {
        //   item.classList.add("yellow");
        //   yellow++;
        //   console.log(yellow);
        // }
      }
    }
    j++;
    // resets j count to 0 once it reaches 5
    if (j == 5) {
      j = 0;
    }
  });
}

// FUNCTION: Make all squares green and call resetGame once you've guessed correctly
function youWin() {
  boxes.forEach((item) => {
    item.classList.add("green");
  });
  alert("Congrats! You did it!");
  resetGame();
}

// FUNCTION: Clear the board and reset the game, then pick a new hidden word
function resetGame() {
  let boxes = document.querySelectorAll(".box");
  boxes.forEach((item) => {
    item.innerHTML = ""; // clears the previous guesses from the board
    item.classList.remove("green", "yellow"); // removes background colors form boxes on the board
  });
  guessedWord = ""; // resets the current guess to ""
  randomIndex = Math.floor(Math.random() * wordBank.length);
  hiddenWord = wordBank[randomIndex].toLowerCase(); // changes the hidden word to a new word
  guesses = 0; // resets the number of guesses to zero for new round
  letterKeys.forEach((item) => {
    item.classList.remove("dark"); // resets keyboard background color
  });
}

// FUNCTION: delete the last letter from your guess
function deleteLetter() {
  targetBox.innerHTML = ""; // delete the last letter added
  targetBox = targetBox.previousElementSibling; // changes the target box to previous letter added
  guessedWord = guessedWord.slice(0, -1); // keeps all but the last letter of your guess
  // console.log(guessedWord);
}
