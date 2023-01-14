<script lang="ts">
	import type { GameType } from '../../types';

	export let previousGame: GameType;
	let isGameOpen = false;

	function handlePreviousClick() {
		isGameOpen = !isGameOpen;
	}
</script>

<div class="previous">
	<button 
		on:click={handlePreviousClick}
		class="previous__button">

		<div>
			{previousGame.score[0].name}
		</div>

		<div class="previous__header-score">
			{previousGame.score[0].totalScore}p
		</div>

		<div class="previous__date">
			{previousGame.date}
		</div>
	</button>

	{#if isGameOpen}
		<div class="previous__more-info">
			<div class="previous__rounds-time-container">
				<div class="previous__rounds">
					Rounds {previousGame.rounds}	
				</div>
				
				<div class="previous__time">
					{previousGame.time}
				</div>
			</div>

			{#each previousGame.score as player, index}
				<div class="previous__player">
					<div class="previous__place"># 
						{index + 1}
					</div>

					<div class="previous__name">
						{player.name}
					</div>

					<div class="previous__score">
						{player.totalScore}
					</div>	
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.previous {
		background-color: #212427;
		color: #f8e9cd;
	}

	.previous__button {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		border: none;
	}

	.previous__header-score {
		font-size: 2.5rem;
	}

	.previous__date,
	.previous__time {
		font-size: 1.2rem;
	}

	.previous__more-info {
		padding: 1rem 2rem;
		border-top: #f8e9cd solid 0.2rem;
	}

	.previous__rounds-time-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.previous__rounds {
		font-size: 1.8rem;
	}

	.previous__player {
		display: grid;
		align-items: center;
		grid-template-columns: 1.5fr 2fr 2fr
	}

	.previous__place {
		font-size: 2rem;
	}

	.previous__name,
	.previous__score {
		font-size: 2.5rem;
	}
</style>