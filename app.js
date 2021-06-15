/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

//call the init function
init();

//roll dice button event
document.querySelector(".btn-roll").addEventListener("click", function () {
	if (gamePlaying) {
		// 1. Random number
		var dice = Math.floor(Math.random() * 6) + 1;

		// 2. Display the result
		var diceDOM = document.querySelector(".dice");
		diceDOM.style.display = "block";
		diceDOM.src = "dice-" + dice + ".png";

		// 3. Update the round score IF the rolled number was NOT a '1'
		if (dice !== 1) {
			//add score
			roundScore += dice;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
		} else {
			//next player
			nextPlayer();
		}
	}
});

document.querySelector(".btn-hold").addEventListener("click", function () {
	if (gamePlaying) {
		//add current score to global score
		scores[activePlayer] += roundScore;

		//update the UI
		document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

		//check if player won the game
		if (scores[activePlayer] >= 20) {
			document.querySelector("#name-" + activePlayer).textContent = "Winner!";
			document.querySelector(".dice").style.display = "none";
			document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
			document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");

			//set the state variable to false to disable game continuity!
			gamePlaying = false;
		} else {
			//next player
			nextPlayer();
		}
	}
});

//reset the score to '0' when click happens to 'new-game'
//eventlistner automatically calls 'init' function thats why we just pass it without parenthesis
//otherwise 'init' function immediately calls even before this event
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;

	//set the state variable to true so all functions can access this state variable
	gamePlaying = true;

	//hide the dice image at start
	document.querySelector(".dice").style.display = "none";

	//setting all the UI values to zero initially
	document.getElementById("score-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";
	document.getElementById("name-0").textContent = "Player 1";
	document.getElementById("name-1").textContent = "Player 2";
	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");

	//first we make sure that no active classes anywhere and then we add 'active' to the first player
	//if we add 'active' class without removing first and imagine player-0 is the active player.
	//In this case 2 active classes adds in the player-0 and if we remove active class then there still would be one left
	//which we dont wanted so simply remove 'active' first then add it
	document.querySelector(".player-0-panel").classList.add("active");
}

function nextPlayer() {
	//Next player
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

	//set roundScore to '0'
	roundScore = 0;

	//update the UI for both players to '0'
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";

	//display the active class on each player turn
	document.querySelector(".player-0-panel").classList.toggle("active");
	document.querySelector(".player-1-panel").classList.toggle("active");
	//document.querySelector(".player-0-panel").classList.remove("active");
	//document.querySelector(".player-1-panel").classList.add("active");

	//hide dice image when '1' occurs in UI for other player
	document.querySelector(".dice").style.display = "none";
}

//document object:
//The document object represents your web page.
//If you want to access any element in an HTML page, you always start with accessing the document object.

//querySelector:
//The querySelector() method returns the first element that matches a specified CSS selector(s) in the document.
//Required. Specifies one or more CSS selectors to match the element. These are used to select HTML elements based on their id,
//classes, types, attributes, values of attributes, etc.
//document.querySelector("#current-" + activePlayer).textContent = dice;

//style:
//change style using style method
//The HTML DOM allows JavaScript to change the style of HTML elements.
//document.querySelector('#current').style.display = 'none';

//classList:
//The classList property returns the class name(s) of an element, as a DOMTokenList object.
//This property is useful to add, remove and toggle CSS classes on an element.
//document.querySelector(".player-0-panel").classList.toggle("active");

//innerHtml:
//The innerHTML property sets or returns the HTML content (inner HTML) of an element.
//The innerHTML property returns the text, including all spacing and inner element tags.
// document.querySelector("#current-" + activePlayer).innerHTML =
//   "<em>" + dice + "</em>";

//reading element from DOM:
//var x = document.querySelector("#score-0").textContent;
//console.log(x);

//addEventListener:
//The document.addEventListener() method attaches an event handler to the document.

//textContent:
//The textContent property returns the text with spacing, but without inner element tags.
//var x = document.querySelector('').textContent;
