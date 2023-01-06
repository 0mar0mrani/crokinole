<script>
	import CrokinoleMenu from "./crokinole-components/CrokinoleMenu.svelte";
	import CrokinoleAnnouncement from "./crokinole-components/CrokinoleAnnouncement.svelte";
	import CrokinolePlayers from "./crokinole-components/CrokinolePlayers.svelte";

	let players = [];
	let currentPlayer = 0;
	let scoreInput = '';
	let isMenuOpen = false;
	let isWinner = false;
	let nameInput = '';
	let addPlayers = false; // true
	let isEnoughPlayers = false;
	let isRoundFinished = true;
	let scoreGoal = 100;
	let playersWithSameScore = [];

	function addNewPlayer(name = nameInput) {
		const maxAmountOfPlayers = 4;
		const isMaxPlayers = players.length < maxAmountOfPlayers;
		const isValidInput = name !== '';

		if (isMaxPlayers && isValidInput) {
			const player = {
				name: name,
				totalScore: 0,
				currentSore: 0,
				id: players.length - 1,
				isPlaying : true,
			}
	
			players.push(player)
		} else {
			if (isMaxPlayers) {
				alert('Max players is 4')
			}
			
			if (isValidInput === false) {
				alert('Please add a name')
			}
		}
	}

	addNewPlayer('Omar');
	addNewPlayer('Amalie');
	addNewPlayer('Oro');
	addNewPlayer('Elias');

	function handleAddClick() {
		if (scoreInput >= 0) {
			addPointsToCurrentScore();
			checkIfRoundFinished();
			goToNextPlayer();

			while (!players[currentPlayer].isPlaying) {
				checkIfRoundFinished();
				goToNextPlayer();
			}

			if (isRoundFinished) {
				subtractAllScoresWithSmallestScore();
				setTotalScore();
				checkIfWinner();
			}

			scoreInput = '';
		} else {
			alert('Please add a number equal or greater than 0')
		}
	}

	function checkIfRoundFinished() {
		const lastPlayer = players.length - 1;

		if (currentPlayer === lastPlayer) {
			isRoundFinished = true;
		}
	}

	function handleInputKeydown(event) {
		if (event.key === 'Enter') {
			if (scoreInput >= 0) {
			addPointsToCurrentScore();
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

	function handleNewRoundClick() {
		isRoundFinished = false;
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

	function handleChangePlayersClick() {
		isMenuOpen = false;
		addPlayers = true;
	}

	function handleStartGameClick() {
		addPlayers = false;
	}

	function handleDeleteClick(event) {
		const playerElementID = Number(event.path[1].dataset.id);
		deletePlayer(playerElementID);
		setIsEnoughPlayers();
		// Force render
		players = players;
	}

	function handleScoreRangeInput(event) {
		const inputValue = event.target.value;
		scoreGoal = inputValue;
	}

	function handleScoreNumberInput(event) {
		const inputValue = event.target.value;
		if (inputValue > 0) {
			scoreGoal = inputValue;
		}
	}

	function subtractAllScoresWithSmallestScore() {
		const copyPlayers = [...players];

		copyPlayers.sort((a, b) => {
			if (a.currentScore > b.currentScore) {
				return -1;
			}

			if (a.currentScore < b.currentScore) {
				return 1;
			}
		})

		const playerWithSmallestCurrentScore = getPlayerWithSmallestCurrentScore();

		players.forEach(player => {
			player.currentScore -= playerWithSmallestCurrentScore;
		})

		function getPlayerWithSmallestCurrentScore() {
			for (let index = copyPlayers.length - 1; index >= 0; index -= 1) {
				if (copyPlayers[index].isPlaying) {
					return copyPlayers[index].currentScore;
				}
			}
		}
	}

	function setTotalScore() {
		players.forEach(player => {
			player.totalScore += player.currentScore;
			player.currentScore = 0;
		})
	}

	function deletePlayer(id) {
		players.splice(id, 1);
	}

	function addPointsToCurrentScore() {
		players[currentPlayer].currentScore = scoreInput;
	}

	function handleAddPlayerClick() {
		addNewPlayer();
		setIsEnoughPlayers();
		nameInput = '';
		// Force render
		players = players;
	}

	function setIsEnoughPlayers() {
		const minimumPlayers = 2;

		if (players.length >= minimumPlayers) {
			isEnoughPlayers = true;
		} else {
			isEnoughPlayers = false;
		}
	}

	function goToNextPlayer() {
		if (currentPlayer === players.length - 1) {
			currentPlayer = 0;
		} else {
			currentPlayer += 1;
		}
	}

	function checkIfWinner() {
		const copyPlayers = [...players];

		copyPlayers.sort((a, b) => {
			if (a.totalScore > b.totalScore) {
				return -1;
			}

			if (a.totalScore < b.totalScore) {
				return 1;
			}
		})

		const playerWithBiggestScore = copyPlayers[0].totalScore;

		if (playerWithBiggestScore >= scoreGoal) {
			playersWithSameScore = [];

			for (let index = 0; index < copyPlayers.length; index += 1) {
				if (copyPlayers[index].totalScore === playerWithBiggestScore) {
					playersWithSameScore.push(copyPlayers[index])
				} else {
					const loserID = copyPlayers[index].id;

					for (const player of players) {
						if (player.id === loserID) {
							player.isPlaying = false;
							console.log('disabled')
						}
					}
				}
			}

			if (playersWithSameScore.length === 1) {
			isWinner = true;
			} else {
				isWinner = false;
			}

			const winnerID = copyPlayers[0].id;

			setWinnerToCurrentPlayer();
			function setWinnerToCurrentPlayer() {
				players.forEach((player, index) => {
					if (player.id === winnerID) {
						currentPlayer = index;
					}
				})
			}
		}
	}

	function initializeGame() {
		currentPlayer = 0;

		for (const player of players) {
			player.currentScore = 0;
			player.totalScore = 0;
			player.isPlaying = 0;
		}

		isWinner = false;
		playersWithSameScore = [];
		players = players;
	}

</script>

<section class="crokinole">
	<div>
		<div>
			<span>Scores</span>

			{#each players as player}
				<div>
					<div>{player.name}</div>

					<div>{player.totalScore}</div>
				</div>
			{/each}
		</div>
	</div>

	{#if isRoundFinished}
		<button
		on:click={handleNewRoundClick}
		>
			New Round
		</button>
	{/if}
	
	{#if !isRoundFinished && players.length > 0}
		<div>
			<div>Current Player: {players[currentPlayer].name}</div>
			
			<div>
				<input type="number" bind:value={scoreInput} on:keydown={handleInputKeydown} step="5">
				<button on:click={handleAddClick}>Add</button>
			</div>
		</div>
	{/if}

	<CrokinoleMenu 
		visibility={isMenuOpen}
		{scoreGoal}
		handler={handleResetGameClick}
		{handleChangePlayersClick}
		{handleScoreRangeInput}
		{handleScoreNumberInput}
	/>

	<CrokinoleAnnouncement
		visibility={isWinner}
		handler={handleNewGameClick}
		currentPlayer={players[currentPlayer]}
		{players}
	/>

	<CrokinolePlayers
		visibility={addPlayers}
		bind:nameInputChild={nameInput}
		{players}
		{isEnoughPlayers}
		{handleAddPlayerClick}
		{handleStartGameClick}
		{handleDeleteClick}
	/>

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