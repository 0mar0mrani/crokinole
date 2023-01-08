<script>
   import { browser } from '$app/environment';
	import CrokinoleMenu from "./crokinole-components/CrokinoleMenu.svelte";
	import CrokinoleAnnouncement from "./crokinole-components/CrokinoleAnnouncement.svelte";
	import CrokinolePlayers from "./crokinole-components/CrokinolePlayers.svelte";
	import MenuSVG from "./crokinole-components/MenuSVG.svelte";
	import CloseSVG from "./crokinole-components/CloseSVG.svelte";

	let state = {
		players : [],
		currentPlayer : 0,
		isMenuOpen : false,
		isWinner : false,
		addPlayers : true, 
		isRoundFinished : true,
		scoreGoal : 100,
		playersWithSameScore : [],
	}

	let scoreInput = '';
	let nameInput = '';

	$: isEnoughPlayers = state.players.length >= 2 ? true : false;
	$: if (state) {
		storeLocally();
	}

	let numberInputEl;
	let nameInputEl;

	function addNewPlayer(name = nameInput) {
		const maxAmountOfPlayers = 4;
		const isMaxPlayers = state.players.length < maxAmountOfPlayers;
		const isValidInput = name !== '';

		if (isMaxPlayers && isValidInput) {
			const player = {
				name: name,
				totalScore: 0,
				currentSore: 0,
				id: state.players.length - 1,
				isPlaying : true,
			}
	
			state.players.push(player)
		} else {
			if (isMaxPlayers) {
				alert('Max players is 4')
			}
			
			if (isValidInput === false) {
				alert('Please add a name')
			}
		}
	}

	function handleAddClick() {
		if (scoreInput >= 0) {
			addPointsToCurrentScore();
			checkIfRoundFinished();
			goToNextPlayer();
			
			while (!state.players[state.currentPlayer].isPlaying) {
				checkIfRoundFinished();
				goToNextPlayer();
			}

			if (state.isRoundFinished) {
				subtractAllScoresWithSmallestScore();
				setTotalScore();
				checkIfWinner();
			} else {
				numberInputEl.focus();
			}
			
			scoreInput = '';
		} else {
			alert('Please add a number equal or greater than 0')
		}
	}

	function handleScoreInputKeydown(event) {
		if (event.key === 'Enter') {
			if (scoreInput >= 0) {
				addPointsToCurrentScore();
				checkIfRoundFinished();
				goToNextPlayer();
			
				while (!state.players[state.currentPlayer].isPlaying) {
					checkIfRoundFinished();
					goToNextPlayer();
				}

				if (state.isRoundFinished) {
					subtractAllScoresWithSmallestScore();
					setTotalScore();
					checkIfWinner();
				} else {
					numberInputEl.focus();
				}
			
				scoreInput = '';
			} else {
				alert('Please add a number equal or greater than 0')
			}
		}
	}

	function checkIfRoundFinished() {
		const lastPlayer = state.players.length - 1;

		if (state.currentPlayer === lastPlayer) {
			state.isRoundFinished = true;
		}
	}

	function handleNewRoundClick() {
		state.isRoundFinished = false;
	}

	function handleNewGameClick() {
		initializeGame();
	}
 
	function handleMenuButtonClick() {
		state.isMenuOpen = !state.isMenuOpen;
	}

	function handleResetGameClick() {
		initializeGame();
		state.isMenuOpen = false;
	}

	function handleChangePlayersClick() {
		state.isMenuOpen = false;
		state.addPlayers = true;
	}

	function handleStartGameClick() {
		initializeGame();
		state.addPlayers = false;
	}

	function handleDeleteClick(event) {
		const playerElementID = event.currentTarget.parentElement.dataset.id;
		deletePlayer(playerElementID);
		state.players = state.players;
	}

	function handleScoreNumberInput(event) {
		const inputValue = event.target.value;
		if (inputValue > 0) {
			state.scoreGoal = inputValue;
		}
	}

	function subtractAllScoresWithSmallestScore() {
		const copyPlayers = [...state.players];

		copyPlayers.sort((a, b) => {
			if (a.currentScore > b.currentScore) {
				return -1;
			}

			if (a.currentScore < b.currentScore) {
				return 1;
			}
		})

		const playerWithSmallestCurrentScore = getPlayerWithSmallestCurrentScore();

		state.players.forEach(player => {
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
		state.players.forEach(player => {
			player.totalScore += player.currentScore;
			player.currentScore = 0;
		})
	}

	function deletePlayer(id) {
		state.players.splice(id, 1);
	}

	function addPointsToCurrentScore() {
		state.players[state.currentPlayer].currentScore = scoreInput;
	}

	function handleAddPlayerClick() {
		addNewPlayer();
		nameInput = '';
		nameInputEl.focus();
		state.players = state.players;
	}

	function handleAddPlayerKeydown(event) {
		if (event.key === 'Enter') {
			addNewPlayer();
			nameInput = '';
			nameInputEl.focus();
			state.players = state.players;
		}
	}

	function goToNextPlayer() {
		if (state.currentPlayer === state.players.length - 1) {
			state.currentPlayer = 0;
		} else {
			state.currentPlayer += 1;
		}
	}

	function checkIfWinner() {
		const copyPlayers = [...state.players];

		copyPlayers.sort((a, b) => {
			if (a.totalScore > b.totalScore) {
				return -1;
			}

			if (a.totalScore < b.totalScore) {
				return 1;
			}
		})

		const playerWithBiggestScore = copyPlayers[0].totalScore;

		if (playerWithBiggestScore >= state.scoreGoal) {
			state.playersWithSameScore = [];

			for (let index = 0; index < copyPlayers.length; index += 1) {
				if (copyPlayers[index].totalScore === playerWithBiggestScore) {
					state.playersWithSameScore.push(copyPlayers[index])
				} else {
					const loserID = copyPlayers[index].id;

					for (const player of state.players) {
						if (player.id === loserID) {
							player.isPlaying = false;
						}
					}
				}
			}

			if (state.playersWithSameScore.length === 1) {
				state.isWinner = true;
			} else {
				state.isWinner = false;
			}

			const winnerID = copyPlayers[0].id;

			setWinnerToCurrentPlayer();
			function setWinnerToCurrentPlayer() {
				state.players.forEach((player, index) => {
					if (player.id === winnerID) {
						state.currentPlayer = index;
					}
				})
			}
		}
	}

	function initializeGame() {
		state.currentPlayer = 0;

		for (const player of state.players) {
			player.currentScore = 0;
			player.totalScore = 0;
			player.isPlaying = true;
		}

		state.isWinner = false;
		state.isRoundFinished = true;
		state.playersWithSameScore = [];
		state.players = state.players;
	}

	function returnGetLocalStorage() {
		if (browser) {
			const localState = window.localStorage.getItem('crokinoleState');
			const parsedLocalState = JSON.parse(localState);
			
			if (localState) {
				state = parsedLocalState;
			} 
		}
	}

	function storeLocally() {
		if (browser) {
			const serializedState = JSON.stringify(state);
			window.localStorage.setItem('crokinoleState', serializedState);
		}
	}

	returnGetLocalStorage();
</script>

<section class="crokinole">
	<button class="crokinole__menu-button" on:click={handleMenuButtonClick}>
		{#if state.isMenuOpen}
			<CloseSVG/>
			{:else}
			<MenuSVG/>
		{/if}
	</button>
	
	<div>
		<div>
			<div class="crokinole__header">Points</div>

			<div class="crokinole__players">
				{#each state.players as player}
					<div class="crokinole__player">
						<div class="crokinole__player-name">{player.name}</div>

						<div class="crokinole__player-score">{player.totalScore}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="crokinole__bottom-section">
		{#if state.isRoundFinished}
			<button
			class="crokinole__button crokinole__button--bottom"
			on:click={handleNewRoundClick}>
				New Round
			</button>
		{/if}
		
		{#if !state.isRoundFinished && state.players.length > 0}
			<div class="crokinole__input-name">
				<div class="crokinole__name">{state.players[state.currentPlayer].name}</div>
				
				<div class="crokinole__input-container">
					<input 
						type="number" 
						class="crokinole__input-number"
						bind:value={scoreInput} 
						bind:this={numberInputEl}
						on:keydown={handleScoreInputKeydown} 
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
		visibility={state.isMenuOpen}
		scoreGoal={state.scoreGoal}
		handler={handleResetGameClick}
		{handleChangePlayersClick}
		{handleScoreNumberInput}
	/>

	<CrokinoleAnnouncement
		visibility={state.isWinner}
		handler={handleNewGameClick}
		currentPlayer={state.players[state.currentPlayer]}
		players={state.players}
	/>

	<CrokinolePlayers
		visibility={state.addPlayers}
		bind:nameInputChild={nameInput}
		bind:nameInputElChild={nameInputEl}
		players={state.players}
		{isEnoughPlayers}
		{handleAddPlayerClick}
		{handleAddPlayerKeydown}
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
		color: inherit;
		cursor: pointer;
		background-color: inherit;
	}

	:global(html) {
		font-size: 10px;
	}

	:global(body) {
		font-size: 3rem;
		font-family: 'Roboto', sans-serif;
		color: #212427;
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
		border-bottom: solid 2px #212427;
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
		border: solid 2px #212427;
		border-radius: 2rem;
	}

	.crokinole__button--bottom {
		margin-top: auto;
	}

	.crokinole__input-number {
		flex-grow: 1;
		appearance: none;
		width: 10%;
		border: solid 2px #212427;
		padding-left: 0.5rem;
	}

	.crokinole__name {
		margin-bottom: 0.5rem;
		font-weight: 500;
	}
</style>