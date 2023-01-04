<script>
	import CrokinoleMenu from "./crokinole-components/CrokinoleMenu.svelte";
	import CrokinoleAnnouncement from "./crokinole-components/CrokinoleAnnouncement.svelte";
	import CrokinolePlayers from "./crokinole-components/CrokinolePlayers.svelte";

	let players = [];
	let currentPlayer = 0;
	let scoreInput = 0;
	let isMenuOpen = false;
	let isWinner = false;
	let nameInput = '';
	let addPlayers = true;
	let isEnoughPlayers = false;

	function addNewPlayer(name = nameInput) {
		const maxAmountOfPlayers = 4;
		const isMaxPlayers = players.length < maxAmountOfPlayers;
		const isValidInput = name !== '';
		console.log(isValidInput)

		if (isMaxPlayers && isValidInput) {
			const player = {
				name: name,
				score: 0,
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

	function deletePlayer(id) {
		players.splice(id, 1);
	}

	function addPointsToCurrentPlayer() {
		players[currentPlayer].score += scoreInput;
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

		console.log(isEnoughPlayers)
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

			{#each players as player}
				<div>
					<div>{player.name}</div>

					<div>{player.score}</div>
				</div>
			{/each}
		</div>
	</div>
	
	{#if players.length > 0}
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
		handler={handleResetGameClick}
		handleChangePlayersClick={handleChangePlayersClick}
	/>

	<CrokinoleAnnouncement
		visibility={isWinner}
		handler={handleNewGameClick}
		currentPlayer={players[currentPlayer]}
		players={players}
	/>

	<CrokinolePlayers
		visibility={addPlayers}
		bind:nameInputChild={nameInput}
		players={players}
		isEnoughPlayers={isEnoughPlayers}
		handleAddPlayerClick={handleAddPlayerClick}
		handleStartGameClick={handleStartGameClick}
		handleDeleteClick={handleDeleteClick}
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