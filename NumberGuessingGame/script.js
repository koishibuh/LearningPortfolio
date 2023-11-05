const remainingGuessCount = document.querySelector(".remainingGuessCount");
const guessField = document.querySelector(".guessField");
const submitGuessButton = document.querySelector(".submitGuessButton");

const guessResult = document.querySelector(".guessResult");
const guessHistory = document.querySelector(".guessHistory");
const gameDone = document.querySelector(".gameDone");

const guessCountField = document.querySelector(".guessCountField");
const setGuessCountButton = document.querySelector(".setGuessCountButton");
const roundCountText = document.querySelector(".roundCountText");
const newGameButton = document.querySelector(".newGameButton");

let randomNumber = selectRandomNumber();
let guessCounter = 0;
let maxGuessLimit = 10;
let guessLeftCounter = 10;
let guessLeftCountText = "";
let gameInProgress = false;

window.addEventListener('load', event => setGuessCount());
setGuessCountButton.addEventListener("click", setGuessCount);
submitGuessButton.addEventListener("click", checkGuess);
newGameButton.addEventListener("click", startNewGame);

function selectRandomNumber() {
	return Math.floor(Math.random() * 100) + 1;
} 
	
function setGuessCount() {
	maxGuessLimit = Number(guessCountField.value);
	guessLeftCounter = maxGuessLimit;
	roundCountText.textContent = guessLeftCounter;
	guessLeftCountText = setGuessRemainingText();
	remainingGuessCount.textContent = guessLeftCountText;
}

function setGuessRemainingText() {
	return `${guessLeftCounter} Guesses Remaining`;
}

function checkGuess() {
	if (guessField.value === "") return;
	
	const userGuess = Number(guessField.value);

	if (gameInProgress === false) {
		gameInProgress === true;
		setGuessCountButton.disabled = true;
		guessCountField.disabled = true;
	}

	if (guessCounter === 0) {
		guessHistory.textContent = "Previous Guesses:"
	}

	if (userGuess === randomNumber) {
		gameDone.textContent = `Congrats! You guessed ${randomNumber} correctly! 🥳`;
		gameDone.style.backgroundColor = "green";
		guessResult.textContent = "";
		endGame(); }
	else if (userGuess < randomNumber) {
		guessResult.textContent = `${userGuess} was too low`;
		guessHistory.textContent = `${guessHistory.textContent} ${userGuess} (Low)`; } 
	else {
		guessResult.textContent = "Your last guess was too high";
		guessHistory.textContent = `${guessHistory.textContent} ${userGuess} (High)`;
	} 
	
	guessCounter++;
	guessLeftCounter = guessLeftCounter - 1;
	
	if (guessCounter === maxGuessLimit) { 
		gameDone.textContent = `Game over, no more guesses! The number was ${randomNumber}.`;
		gameDone.style.backgroundColor = "rgb(157, 41, 41)";
		remainingGuessCount.textContent = setGuessRemainingText();

		endGame(); } 
	else {
		remainingGuessCount.textContent = setGuessRemainingText();
		guessField.focus();
		guessField.value = "";
	}
	
}

function endGame() {
	submitGuessButton.disabled = true;
	guessField.disabled = true;
}

function startNewGame() {
	guessCounter = 0;
	guessLeftCounter = maxGuessLimit;
	gameInProgress = false;
	
	guessField.value = "";
	guessField.disabled = false;
	submitGuessButton.disabled = false;
	guessCountField.disabled = false;
	setGuessCountButton.disabled = false;

	const resetResultBox = document.querySelectorAll(".resultBox p");
	for (const item of resetResultBox) {
		item.textContent = "-";
	}

	guessField.focus();

	gameDone.style.backgroundColor = "initial";
	remainingGuessCount.textContent = guessLeftCountText;

	randomNumber = selectRandomNumber();
}