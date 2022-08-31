const hiddenWord = "abriq"; // The word you're trying to guess

let guessedWord = "abri"; // Starting guess ("")

const box1 = document.querySelector(".box"); // first box in first row

const q = document.querySelector(".key"); // 'q' key event listener

const erase = document.querySelector(".erase"); // delete key event listener

const enter = document.querySelector(".enter"); // enter key event listener

// TO DO: Add event listeners to all keyboard keys

// TO DO: Find the next open box

// When a key is pressed, add that letter to the next open box and add the letter to the guessed word
q.addEventListener("click", function () {
  $(".box:empty:first").text("Q"); // finds the first empty box and changes the text to 'q'
  guessedWord = guessedWord.concat("q"); // adds 'q' to the end of current guess
  console.log(guessedWord);
});

// FUNCTION: Check if the word is correct when clicking enter
enter.addEventListener("click", function () {
  if (guessedWord.toLowerCase() === hiddenWord.toLowerCase()) {
    console.log("you guessed it!");
  } else {
    console.log("Not this time!");
  }
});

// FUNCTION: Check if the guessed word is correct
function checkWord() {}

checkWord();

// TO DO: After a letter has been added, update the next open box

// FUNCTION: Erase the last letter from your guess
erase.addEventListener("click", function () {
  box1.innerHTML = ""; // empties square one (temp)
  guessedWord = guessedWord.slice(0, -1); // keeps all but the last letter of your guess
  console.log(guessedWord);
  lastBox = document.querySelector(".box:not(:empty)");
});

// TO DO: change the text of the last filled in square to "" when clicking 'delete'
