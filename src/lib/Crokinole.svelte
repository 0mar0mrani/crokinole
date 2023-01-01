<script>
	const players = [];
	let currentPlayer = 0;
	let scoreInput = 0;
	let isMenuOpen = false;

	function addNewPlayer(nameInput) {
		const player = {
			name: nameInput,
			score: 0
		}

		players.push(player)
	}

	addNewPlayer('Omar');
	addNewPlayer('Amalie');

	function handleAddClick() {
		if (scoreInput >= 0) {
			addPointsToCurrentPlayer();
			const isWinner = checkIfWinner();

			if (isWinner) {
				initializeGame();
			} else {
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
			const isWinner = checkIfWinner();

			if (isWinner) {
				initializeGame();
			} else {
				goToNextPlayer();
			}
		
			scoreInput = 0;
			} else {
				alert('Please add a number equal or greater than 0')
			}
		}
	}

	function handleMenuButtonClick() {
		isMenuOpen = !isMenuOpen;
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
			alert(`${players[currentPlayer].name} is the winner with ${players[currentPlayer].score} points`);
			return true;
		} else {
			false;
		}
	}

	function initializeGame() {
		currentPlayer = 0;
		players.forEach(player => player.score = 0);
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

	<div class={`crokinole__menu ${isMenuOpen ? 'crokinole__menu--open' : ''}`}>
		<button class="crokinole__menu-item-button">Reset game</button>

		<button class="crokinole__menu-item-button">Reset players</button>
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

	.crokinole__menu {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: red;
		transition: all 0.3s;
		transform: translateX(100%);
	}

	.crokinole__menu--open {
		transform: translateX(0);
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