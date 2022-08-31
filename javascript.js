const wordBank = [
  "Amber",
  "Ashen",
  "Azure",
  "Beige",
  "Beryl",
  "Black",
  "Blond",
  "Blush",
  "Brown",
  "Coral",
  "Cream",
  "Dusky",
  "Ebony",
  "Eosin",
  "Flame",
  "Green",
  "Gules",
  "Hazel",
  "Henna",
  "Hoary",
  "Indol",
  "Ivory",
  "Khaki",
  "Lemon",
  "Liard",
  "Liart",
  "Lilac",
  "Livid",
  "Lovat",
  "Lyart",
  "Mauve",
  "Milky",
  "Mocha",
  "Mousy",
  "Murex",
  "Ochre",
  "Olive",
  "Orcin",
  "Orpin",
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
  "Swart",
  "Taupe",
  "Tawny",
  "Topaz",
  "Umber",
  "Virid",
  "Wheat",
  "White",
];

let hiddenWord = wordBank[0].toLowerCase(); // The word you're trying to guess

let guessedWord = ""; // Starting guess ("")

let guesses = 0;

const deleteKey = document.querySelector(".deleteKey"); // deleteKey key event listener

const enter = document.querySelector(".enter"); // enter key event listener

// Add event listeners to all keyboard keys, add selected letter to guess
document.querySelectorAll(".key").forEach((item) => {
  item.addEventListener("click", (event) => {
    if (guessedWord.length < 5) {
      // only allow adding letters if the word is less than 5 letters long
      targetBox = document.querySelector(".box:empty"); // sets the target to the next open box
      targetBox.innerHTML = item.innerHTML; // places selected letter in the target box
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
  hiddenWord = wordBank[1]; // changes the hidden word to a new word
  guesses = 0; // resets the number of guesses to zero for new round
}

// FUNCTION: Check if the word is correct when clicking enter
enter.addEventListener("click", function () {
  if (guessedWord.length == 5) {
    // Changes the correctly guessed letters to green
    let boxes = document.querySelectorAll(".box");
    let j = 0;
    boxes.forEach((item) => {
      if (item.innerHTML != "") {
        if (item.innerHTML.toLowerCase() == hiddenWord[j]) {
          item.classList.add("green");
        } else if (
          /* if letter is in the word in another place in the word*/
          hiddenWord.includes(item.innerHTML.toLowerCase())
        ) {
          item.classList.add("yellow");
          console.log(j + " no");
        }
      }
      j++;
    });

    // TO DO: Bring color changes to each new row as you play

    // Checks that guess is 5 letters long
    if (guessedWord.toLowerCase() === hiddenWord.toLowerCase()) {
      // Check if the guessed word is correct
      console.log("you guessed it!");
      resetGame();
    } else {
      console.log("Not this time!");
    }
    guessedWord = "";
    guesses++;
    console.log("Guess Number: " + guesses);
  } else {
    console.log("Please enter a five letter word."); // If guess is not 5 letters long, promts the user
  }

  if (guesses >= 6) {
    alert("Better luck next time!");
    resetGame();
  }
});

// FUNCTION: deleteKey the last letter from your guess
deleteKey.addEventListener("click", function () {
  targetBox.innerHTML = ""; // deleteKeys the last letter added
  targetBox = targetBox.previousElementSibling; // changes the target box to previous letter added
  guessedWord = guessedWord.slice(0, -1); // keeps all but the last letter of your guess
  console.log(guessedWord);
});
