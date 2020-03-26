let numSquares = 6;
let colors = [];
let totalScore = 0;
let addScore = 600;
let gamesPlayed = 0;
let pickedColor;
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.querySelector("#message");
const scoreDisplay = document.getElementById("score");
const gameDisplay = document.getElementById("games");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	setUpModeButtons();
	setUpSquares();
	reset();
}

function setUpModeButtons(){
	for(let i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3
				:this.textContent === "Medium" ? numSquares = 6
				:numSquares = 9;
			this.textContent === "Easy" ? addScore = 300
				:this.textContent === "Medium" ? addScore = 600
				:addScore = 900;
			reset();
		});
	}
}

function setUpSquares(){
	for(let i = 0; i < squares.length; i++){
		squares[i].addEventListener("click", function(){
			let clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "CORRECT! +" + addScore;
				changeColors(clickedColor);
				h1.style.backgroundColor = pickedColor;
				resetButton.textContent = "Play Again?";
				totalScore += addScore;
				scoreDisplay.textContent = "Score: " + totalScore;
				gamesPlayed++;
				gameDisplay.textContent = "Games: " + gamesPlayed;
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "TRY AGAIN";
				addScore -= 100;
			}
		});
	}
}

function resetAddScore(){
	for(let i = 1; i <= modeButtons.length; i++){
		if (modeButtons[i-1].classList.contains("selected")){
			addScore = i *300;
		}
	}
}

function reset(){
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	for(let i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "lightgreen";
}

resetButton.addEventListener("click", function(){
	reset();
	resetAddScore();
});

function changeColors(color){
	// loop through all squares
	for(let i = 0; i < squares.length; i++){
		// change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	// make an array
	let arr = [];
	// repeat num times
	for(let i = 0; i < num; i++){
	// get random color and push into arr
	arr.push(randomColor())
	}
	// return that array
	return arr;
}

function randomColor(){
	// pick a "red" from 0-255
	let r = Math.floor(Math.random() * 76);
	// pick a "green" from 0-255
	let g = Math.floor(Math.random() * 156) + 100;
	// pick a "blue" from 0-255
	let b = Math.floor(Math.random() * 51);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}