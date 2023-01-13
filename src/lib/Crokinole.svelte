<script lang="ts">
   import { browser } from '$app/environment';
	import CrokinoleMenu from "./crokinole-components/CrokinoleMenu.svelte";
	import CrokinoleAnnouncement from "./crokinole-components/CrokinoleAnnouncement.svelte";
	import CrokinolePlayers from "./crokinole-components/CrokinolePlayers.svelte";
	import MenuSVG from "../assets/svg/MenuSVG.svelte";
	import CloseSVG from "../assets/svg/CloseSVG.svelte";

	type Player = {
		name: string,
		totalScore: number,
		currentScore: number,
		id: string,
		isPlaying : boolean,
	}

	type Game = {
		time: string
		date: string;
		rounds: number;
		score: Player[];
	}

	type StateType = {
		players: Player[],
		playersScoreSorted: Player[];
		currentPlayer: number,
		isMenuOpen: boolean,
		isWinner: boolean,
		addPlayers: boolean,
		isRoundFinished: boolean,
		scoreGoal: number,
		playersWithSameScore: Player[],
		rounds: number;
		previousGames: Games[];
	}
	
	let state: StateType = {
		players: [],
		playersScoreSorted: [],
		currentPlayer: 0,
		isMenuOpen: false,
		isWinner: false,
		addPlayers: true, 
		isRoundFinished: true,
		scoreGoal: 100,
		playersWithSameScore: [],
		rounds: 0,
		previousGames: [],
	}
	
	let scoreInput = '';
	let nameInput = '';
	let numberInputEl: HTMLElement;
	let nameInputEl: HTMLElement;

	$: isEnoughPlayers = state.players.length >= 2 ? true : false;
	$: if (state) {
		// storeLocally();
	}

	function handleAddClick() {
		if (Number(scoreInput) >= 0) {
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

			if (state.isWinner) {
				const copyPlayersScoredSorted = JSON.stringify(state.playersScoreSorted);

				const currentTime = Date.now();
				const date = new Date(currentTime);

				const day = date.getDate();
				const month = date.getMonth() + 1;
				const year = date.getFullYear();

				const minutes = date.getMinutes();
				const hours = date.getHours();

				const costumeDate = `${day}/${month}/${year}`;
				let costumeTime;
				
				if (minutes > 9) {
					costumeTime = `${hours}:${minutes}`;
				} else {
					costumeTime = `${hours}:0${minutes}`;
				}

				const justPlayedGame = {
					date: costumeDate,
					time: costumeTime,
					rounds: state.rounds,
					score: JSON.parse(copyPlayersScoredSorted),
				};

				state.previousGames.unshift(justPlayedGame);
			}
			
			scoreInput = '';
		} else {
			alert('Please add a number equal or greater than 0')
		}
	}

	function handleScoreInputKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleAddClick();
		}
	}

	function checkIfRoundFinished() {
		const lastPlayer = state.players.length - 1;

		if (state.currentPlayer === lastPlayer) {
			state.isRoundFinished = true;
		}
	}

	function handleNewRoundClick() {
		state.rounds += 1; 
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

	function handleDeleteClick(event: PointerEvent) {
		const target = event.currentTarget as HTMLButtonElement;

		if (target.parentElement) {
			const playerElementID: string | undefined = target.parentElement.dataset.id;

			if (playerElementID) {
				deletePlayer(playerElementID);
				state.players = state.players;
			}
		}
	}

	function handleScoreNumberInput(event: InputEvent) {
		const target = event.target as HTMLInputElement;

		if (target) {
			const inputValue: number  = Number(target.value);

			if (inputValue > 0) {
				state.scoreGoal = inputValue;
			}
		}
	}

	function handlePreviousScoreClick(event: PointerEvent) {
		const target = event.target as HTMLButtonElement;

		if (target) {
			state.isPreviousGamesOpen = true;
		}
	}

	function handleBackClick(event: PointerEvent) {
		const target = event.target as HTMLButtonElement;

		if (target) {
			state.isPreviousGamesOpen = false;
		}
	}

	function subtractAllScoresWithSmallestScore() {
		state.playersScoreSorted = [...state.players];

		state.playersScoreSorted.sort((a: Player, b: Player) => {
			if (a.currentScore > b.currentScore) {
				return -1;
			}

			if (a.currentScore < b.currentScore) {
				return 1;
			}
		})

		const playerWithSmallestCurrentScore = returnGetPlayerWithSmallestCurrentScore();

		if (playerWithSmallestCurrentScore) {
			state.players.forEach(player => {
				if (player.isPlaying) {
					player.currentScore -= playerWithSmallestCurrentScore;
				}
			})
		}


		function returnGetPlayerWithSmallestCurrentScore(): number | undefined {
			for (let index = state.playersScoreSorted.length - 1; index >= 0; index -= 1) {
				if (state.playersScoreSorted[index].isPlaying) {
					return state.playersScoreSorted[index].currentScore;
				}
			}
		}
	}

	function addNewPlayer() {
		const maxAmountOfPlayers = 4;
		const isMaxPlayers = state.players.length < maxAmountOfPlayers;
		const isValidInput = nameInput !== '';

		if (isMaxPlayers && isValidInput) {
			const newPlayer = {
				name: nameInput,
				totalScore: 0,
				currentScore: 0,
				id: String(Date.now()),
				isPlaying : true,
			}
	
			state.players.push(newPlayer)
		} else {
			if (isMaxPlayers) {
				alert('Max players is 4')
			}
			
			if (isValidInput === false) {
				alert('Please add a name')
			}
		}
	}

	function setTotalScore() {
		state.players.forEach(player => {
			player.totalScore += player.currentScore;
			player.currentScore = 0;
		})
	}

	function deletePlayer(id: string) {
		const idToNumber = Number(id);

		state.players.splice(idToNumber, 1);
	}

	function addPointsToCurrentScore() {
		state.players[state.currentPlayer].currentScore = Number(scoreInput);
	}

	function handleAddPlayerClick() {
		addNewPlayer();
		nameInput = '';
		nameInputEl.focus();
		state.players = state.players;
	}

	function handleAddPlayerKeydown(event: KeyboardEvent) {

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
		state.playersScoreSorted = [...state.players];

		state.playersScoreSorted.sort((a: Player, b: Player) => {
			if (a.totalScore > b.totalScore) {
				return -1;
			}

			if (a.totalScore < b.totalScore) {
				return 1;
			}
		})

		const playerWithBiggestScore = state.playersScoreSorted[0].totalScore;

		if (playerWithBiggestScore >= state.scoreGoal) {
			state.playersWithSameScore = [];

			for (let index = 0; index < state.playersScoreSorted.length; index += 1) {
				if (state.playersScoreSorted[index].totalScore === playerWithBiggestScore) {
					state.playersWithSameScore.push(state.playersScoreSorted[index])
				} else {
					const loserID = state.playersScoreSorted[index].id;

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

			const winnerID = state.playersScoreSorted[0].id;

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
		state.rounds = 0;
		state.isRoundFinished = true;
		state.playersWithSameScore = [];
		state.players = state.players;
	}

	function returnGetLocalStorage() {
		if (browser) {
			const localState: string | null = window.localStorage.getItem('crokinoleState');
			
			if (localState) {
				const parsedLocalState = JSON.parse(localState);
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
			<div class="crokinole__header-round-container">
				<div class="crokinole__header">Points</div>

				<div class="crokinole__round">{state.rounds === 0 ? '' : `Round ${state.rounds}`}</div>
			</div>

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
						inputmode="numeric" 
						pattern="[0-9]*"
						bind:value={scoreInput} 
						bind:this={numberInputEl}
						on:keydown={handleScoreInputKeydown} 
						step="5"
					>

					<button 
					class={`crokinole__button ${scoreInput !== '' ? '' : 'crokinole__button--deactivated'}`}
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

	.crokinole__header-round-container {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: 2rem;
		border-bottom: solid 2px #212427;
	}

	.crokinole__round {
		font-size: 2rem;
		margin-bottom: 0.4rem;
	}

	.crokinole__header {
		font-size: 4rem;
		font-weight: 500;
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
		background-color: #212427;
		color: #f8e9cd;
		border: none;
		border-radius: 2rem;
	}

	.crokinole__button--deactivated {
		opacity: 0.2;
		pointer-events: none;
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