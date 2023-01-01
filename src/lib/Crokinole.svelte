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

<section class="crokinole">
	<h1>Crokinole</h1>
</section>

<style>
	.crokinole {
		background-color: rebeccapurple;
	}
</style>