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

// TO DO: DOn't show duplicate yellow sqares if letter is only in the word once

randomIndex = Math.floor(Math.random() * wordBank.length);

let hiddenWord = wordBank[randomIndex].toLowerCase(); // The word you're trying to guess

let guessedWord = ""; // Starting guess ("")

let guesses = 0;

const deleteKey = document.querySelector(".deleteKey"); // deleteKey key event listener

const enter = document.querySelector(".enter"); // enter key event listener

const boxes = document.querySelectorAll(".box");

// Add event listeners to all keyboard keys, add selected letter to guess
const keys = document.querySelectorAll(".key");

keys.forEach((item) => {
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

// FUNCTION: Clear the board and reset the game, then pick a new hidden word
function resetGame() {
  let boxes = document.querySelectorAll(".box");
  boxes.forEach((item) => {
    item.innerHTML = ""; // clears the previous guesses from the board
    item.classList.remove("green", "yellow"); // removes background colors form boxes on the board
  });
  guessedWord = ""; // resets the current guess to ""
  hiddenWord = wordBank[randomIndex]; // changes the hidden word to a new word
  guesses = 0; // resets the number of guesses to zero for new round
  keys.forEach((item) => {
    item.classList.remove("dark"); // resets keyboard background color
  });
}

// FUNCTION: Check if the word is correct when clicking enter
let j = 0;
enter.addEventListener("click", checkGuess);

function checkGuess() {
  if (guessedWord.length == 5) {
    // Checks that guess is 5 letters long

    if (guessedWord.toLowerCase() === hiddenWord.toLowerCase()) {
      // Check if the guessed word is correct
      boxes.forEach((item) => {
        item.classList.add("green");
      });
      console.log("you guessed it!");
      alert("Congrats! You did it!");
      resetGame();
    } else {
      console.log("Not this time!");
    }
    guessedWord = "";
    guesses++;

    // Changes the correctly guessed letters to green
    boxes.forEach((item) => {
      if (item.innerHTML != "") {
        if (item.innerHTML.toLowerCase() == hiddenWord[j]) {
          item.classList.add("green");
        } else if (
          /* if letter is in the word in another place in the word*/
          hiddenWord.includes(item.innerHTML.toLowerCase())
        ) {
          item.classList.add("yellow");
        }
      }
      j++;
      if (j == 5) {
        // restets j count to 0 once it reaches 5
        j = 0;
      }
    });
  } else {
    console.log("Please enter a five letter word."); // If guess is not 5 letters long, promts the user
  }

  if (guesses >= 6) {
    alert("Better luck next time!");
    resetGame();
  }
}

// FUNCTION: delete the last letter from your guess
deleteKey.addEventListener("click", function () {
  targetBox.innerHTML = ""; // delete the last letter added
  targetBox = targetBox.previousElementSibling; // changes the target box to previous letter added
  guessedWord = guessedWord.slice(0, -1); // keeps all but the last letter of your guess
  // console.log(guessedWord);
});
