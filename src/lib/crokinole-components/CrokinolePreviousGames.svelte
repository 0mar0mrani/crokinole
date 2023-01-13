<script lang="ts">
	import CrokinolePreviousGame from "./CrokinolePreviousGame.svelte";

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

	export let isPreviousGamesOpen: boolean;
	export let previousGames: Game[];
	export let handleBackClick: void;
</script>

{#if isPreviousGamesOpen}
	<div class="crokinole__previous-games"> 
		<div class="crokinole__header">Previous Games</div>

		<div class="crokinole__previous-games-container">
			{#each previousGames as previousGame}
				<CrokinolePreviousGame
					{previousGame}
				/>
			{/each}
		</div>

		<button class="crokinole__button" on:click={handleBackClick}>Back</button>
	</div>
{/if}

