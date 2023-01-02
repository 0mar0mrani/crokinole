<script>
	import CrokinoleMenu from "./crokinole-components/CrokinoleMenu.svelte";

	let players = [];
	let currentPlayer = 0;
	let scoreInput = 0;
	let isMenuOpen = false;
	let isWinner = false;

	function addNewPlayer(nameInput) {
		const player = {
			name: nameInput,
			score: 0,
		}

		players.push(player)
	}

	addNewPlayer('Omar');
	addNewPlayer('Amalie');

	function handleAddClick() {
		if (scoreInput >= 0) {
			addPointsToCurrentPlayer();
			checkIfWinner();

			if (!isWinner) {
				goToNextPlayer();
			} 
		
			scoreInput = 0;
		} else {
			alert('Please add a number equal or greater than 0')
		}
	}

	function handleInputKeydown(event) {
		if (event.key === 'Enter') {
			if (scoreInput >= 0) {
			addPointsToCurrentPlayer();
			checkIfWinner();

			if (!isWinner) {
				goToNextPlayer();
			} 
		
			scoreInput = 0;
			} else {
				alert('Please add a number equal or greater than 0')
			}
		}
	}

	function handleNewGameClick() {
		initializeGame();
	}
 
	function handleMenuButtonClick() {
		isMenuOpen = !isMenuOpen;
	}

	function handleResetGameClick() {
		initializeGame();
		isMenuOpen = false;
	}

	function addPointsToCurrentPlayer() {
		players[currentPlayer].score += scoreInput;
	}

	function goToNextPlayer() {
		if (currentPlayer === players.length - 1) {
			currentPlayer = 0;
		} else {
			currentPlayer += 1;
		}
	}

	function checkIfWinner() {
		if (players[currentPlayer].score >= 100) {
			isWinner = true;
		}
	}

	function initializeGame() {
		currentPlayer = 0;

		for (const player of players) {
			player.score = 0;
		}
		// Force render
		players = players;

		isWinner = false;
	}

</script>

<section class="crokinole">
	<div>
		<div>
			<span>Scores</span>

			<div>
				{players[0].name}
			</div>

			<div> 
				{players[0].score}
			</div>

			<div>
				{players[1].name}
			</div>

			<div> 
				{players[1].score}
			</div>
		</div>
	</div>
	
	<div>
		<div>Current Player: {players[currentPlayer].name}</div>
		
		<div>
			<input type="number" bind:value={scoreInput} on:keydown={handleInputKeydown} step="5">
			<button on:click={handleAddClick}>Add</button>
		</div>
	</div>

	<CrokinoleMenu 
		visibility={isMenuOpen}
		handler={handleResetGameClick}
	/>

	<div class={`crokinole__announcement ${isWinner ? 'crokinole__announcement--open' : ''}`}>
		<div>{players[currentPlayer].name} is the winner with {players[currentPlayer].score} points</div>

		<button class="crokinole__menu-item-button" on:click={handleNewGameClick}>New game</button>

		<button class="crokinole__menu-item-button">New game and players</button>
	</div>

	<button class="crokinole__menu-button" on:click={handleMenuButtonClick}>Menu</button>
</section>

<style>
	.crokinole {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}

	.crokinole__menu-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}

	.crokinole__announcement {
		display: none;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 100;

		background-color: rebeccapurple;
	} 

	.crokinole__announcement--open {
		display: flex;
	}

	.crokinole__menu-item-button {
		font-size: 2rem;
		border: none;
		cursor: pointer;
	}

	.crokinole__menu-button:hover,
	.crokinole__menu-button:active {
		background-color: rebeccapurple;
	}

</style>