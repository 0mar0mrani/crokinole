<script lang="ts">
	import type { PlayerType } from '../../types';

	export let handleNewGameClick: void;
	export let playersTotalScoreSorted: PlayerType[];
	export let isWinner: boolean;
	export let rounds: number;

</script>

{#if isWinner}
	<div class="announcement">
		<div class="announcement__text">
			{playersTotalScoreSorted[0].name} is the winner with {playersTotalScoreSorted[0].totalScore} points!
		</div>

		<div class="announcement__score-board">
			<div class="announcement__rounds">
				Rounds {rounds}	
			</div>

			{#each playersTotalScoreSorted as player, index}
				<div class="announcement__player">
					<div class="announcement__place"># 
						{index + 1}
					</div>

					<div class="announcement__name">
						{player.name}
					</div>

					<div class="announcement__score">
						{player.totalScore}
					</div>	
				</div>
			{/each}
		</div>

		<button class="announcement__button" on:click={handleNewGameClick}>
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

	.announcement__score-board {
		background-color: #212427;
		color: #f8e9cd;
		width: 30rem;
		padding: 1rem 2rem;
		border-radius: 2rem;
	}

	.announcement__rounds {
		font-size: 1.8rem;
		margin-bottom: 1rem;
	}

	.announcement__player {
		display: grid;
		align-items: center;
		grid-template-columns: 1.5fr 2fr 2fr
	}

	.announcement__place {
		font-size: 2rem;
	}

	.announcement__name,
	.announcement__score {
		font-size: 2.5rem;
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