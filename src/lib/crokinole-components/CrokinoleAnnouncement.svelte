<script lang="ts">
	import type { PlayerType } from '../../types';

	export let handler: void;
	export let visibility: boolean;
	export let winner: PlayerType[];
</script>

{#if winner.length === 1}
	<div class={`announcement ${visibility ? 'announcement--open' : ''}`}>
		<div class="announcement__text">
			{winner[0].name} is the winner with {winner[0].totalScore} points!
		</div>

		<button class="announcement__button" on:click={handler}>
			New game
		</button>
	</div>
{/if}

<style>
	.announcement {
		display: none;
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

	.announcement--open {
		display: flex;
	}

	.announcement__text {
		padding: 0 2rem;
	}

	.announcement__button {
		padding: 1rem 2rem;
		border: solid 2px #212427;
		border-radius: 2rem;
		align-self: center;
	}
</style>