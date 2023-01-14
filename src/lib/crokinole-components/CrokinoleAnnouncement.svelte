<script lang="ts">
	import type { PlayerType } from '../../types';

	export let handler: void;
	export let playersScoreSorted: PlayerType[];
	export let isWinner: boolean;

</script>

{#if isWinner}
	<div class="announcement">
		<div class="announcement__text">
			{playersScoreSorted[0].name} is the winner with {playersScoreSorted[0].totalScore} points!
		</div>

		<button class="announcement__button" on:click={handler}>
			New game
		</button>
	</div>
{/if}

<style>
	.announcement {
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

	.announcement__text {
		padding: 0 2rem;
	}

	.announcement__button {
		padding: 1rem 2rem;
		background-color: #212427;
		color: #f8e9cd;
		border: none;
		border-radius: 2rem;
		align-self: center;
	}
</style>