<script>
	import CrokinoleMenu from "./crokinole-components/CrokinoleMenu.svelte";
	import CrokinoleAnnouncement from "./crokinole-components/CrokinoleAnnouncement.svelte";
	import CrokinolePlayers from "./crokinole-components/CrokinolePlayers.svelte";
	import MenuSVG from "./crokinole-components/MenuSVG.svelte";
	import CloseSVG from "./crokinole-components/CloseSVG.svelte";

	let players = [];
	let currentPlayer = 0;
	let scoreInput = '';
	let isMenuOpen = false;
	let isWinner = false;
	let nameInput = '';
	let addPlayers = false; // true
	let isRoundFinished = true;
	let scoreGoal = 100;
	let playersWithSameScore = [];

	$: isEnoughPlayers = players.length >= 2 ? true : false;

	let numberInputEl;
	let nameInputEl;

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

			numberInputEl.focus();
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
		const playerElementID = event.currentTarget.parentElement.dataset.id;
		deletePlayer(playerElementID);
		players = players;
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
			if (player.isPlaying) {
			player.currentScore -= playerWithSmallestCurrentScore;
			}
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
		nameInput = '';
		nameInputEl.focus();
		players = players;
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
			player.isPlaying = true;
		}

		isWinner = false;
		isRoundFinished = true;
		playersWithSameScore = [];
		players = players;
	}

</script>

<section class="crokinole">
	<button class="crokinole__menu-button" on:click={handleMenuButtonClick}>
		{#if isMenuOpen}
			<CloseSVG/>
			{:else}
			<MenuSVG/>
		{/if}
	</button>
	
	<div>
		<div>
			<div class="crokinole__header">Points</div>

			<div class="crokinole__players">
				{#each players as player}
					<div class="crokinole__player">
						<div class="crokinole__player-name">{player.name}</div>

						<div class="crokinole__player-score">{player.totalScore}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="crokinole__bottom-section">
		{#if isRoundFinished}
			<button
			class="crokinole__button crokinole__button--bottom"
			on:click={handleNewRoundClick}>
				New Round
			</button>
		{/if}
		
		{#if !isRoundFinished && players.length > 0}
			<div class="crokinole__input-name">
				<div class="crokinole__name">{players[currentPlayer].name}</div>
				
				<div class="crokinole__input-container">
					<input 
						type="number" 
						class="crokinole__input-number"
						bind:value={scoreInput} 
						bind:this={numberInputEl}
						on:keydown={handleInputKeydown} 
						step="5"
					>

					<button 
					class="crokinole__button"
					on:click={handleAddClick}>
						Add
					</button>
				</div>
			</div>
		{/if}
	</div>

	<CrokinoleMenu 
		visibility={isMenuOpen}
		{scoreGoal}
		handler={handleResetGameClick}
		{handleChangePlayersClick}
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
		bind:nameInputElChild={nameInputEl}
		{players}
		{isEnoughPlayers}
		{handleAddPlayerClick}
		{handleStartGameClick}
		{handleDeleteClick}
	/>
</section>

<style>
	:global(*) {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		user-select: none;
	}

	:global(button, input) {
		font-family: inherit;
		font-size: inherit;
		cursor: pointer;
		background-color: inherit;
	}

	:global(html) {
		font-size: 10px;
	}

	:global(body) {
		font-size: 3rem;
		font-family: 'Roboto', sans-serif;
	}

	.crokinole {
		height: 100%;
		width: 100%;
		max-width: 30rem;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		z-index: 1;
	}

	.crokinole__menu-button {
		position: absolute;
		top: 2rem;
		right: 2rem;
		width: 4rem;
		height: 4rem;
		border: none;
		z-index: 100;
	}
	.crokinole__menu-item-button {
		font-size: 2rem;
		border: none;
		cursor: pointer;
	}

	.crokinole__header {
		font-size: 4rem;
		font-weight: 500;
		margin-bottom: 2rem;
		border-bottom: solid 2px #000;
	}

	.crokinole__players {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		height: 16rem;
	}

	.crokinole__player {
		display: flex;
		justify-content: space-between;
	}

	.crokinole__bottom-section {
		display: flex;
		flex-direction: column;
		height: 10rem;
	}

	.crokinole__input-container {
		display: flex;
		gap: 2rem;
		width: 100%;
	}

	.crokinole__input-name {
		margin-top: auto;
	}

	.crokinole__button {
		padding: 1rem 2rem;
		border: solid 2px #000;
		border-radius: 2rem;
	}

	.crokinole__button--bottom {
		margin-top: auto;
	}

	.crokinole__input-number {
		flex-grow: 1;
		appearance: none;
		width: 10%;
		border: solid 2px #000;
		padding-left: 0.5rem;
	}

	.crokinole__name {
		margin-bottom: 0.5rem;
		font-weight: 500;
	}
</style>