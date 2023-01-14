<script lang="ts">
	import CrokinolePreviousGame from "./CrokinolePreviousGame.svelte";
	import type { GameType } from '../../types';

	export let isPreviousGamesOpen: boolean;
	export let previousGames: GameType[];
	export let handleBackClick: void;
</script>

{#if isPreviousGamesOpen}
	<div class="previous__previous-games"> 
		<div class="previous__header">Previous Games</div>

		<div class="previous__previous-games-container">
			{#each previousGames as previousGame}
				<CrokinolePreviousGame
					{previousGame}
				/>
			{/each}
		</div>

		<button class="previous__button" on:click={handleBackClick}>Back</button>
	</div>
{/if}

<style>
	.previous__previous-games {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 100;
		background-color: #a3622c78;
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);;
	}

	.previous__header {
		font-size: 4rem;
		font-weight: 500;
		margin-bottom: 2rem;
		border-bottom: solid 2px #212427;
	}

	.previous__previous-games-container {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		border: solid 2px #212427;
		width: 100%;
		max-width: 30rem;
		overflow-y: scroll;
		height: 70%;
	}

	.previous__button {
		padding: 1rem 2rem;
		background-color: #212427;
		color: #f8e9cd;
		border: none;
		border-radius: 2rem;
		align-self: center;
	}
</style>