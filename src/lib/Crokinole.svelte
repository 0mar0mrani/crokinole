<script>
	const players = [];
	let currentPlayer = 0;
	let scoreInput = 0;

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
			<input type="number" bind:value={scoreInput} step="5">
			<button on:click={handleAddClick}>Add</button>
		</div>
	</div>
</section>

<style>
	.crokinole {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
</style>