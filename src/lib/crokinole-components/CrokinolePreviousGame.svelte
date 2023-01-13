<script lang="ts">
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

	export let previousGame: Game;
	let isGameOpen = false;

	function handlePreviousClick() {
		isGameOpen = !isGameOpen;
	}
</script>

<div class="crokinole__previous-game">
	<button 
		on:click={handlePreviousClick}
		class="crokinole__button">

		<div>
			{previousGame.score[0].name}
		</div>

		<div class="crokinole__header-score">
			{previousGame.score[0].totalScore}p
		</div>

		<div class="crokinole__date">
			{previousGame.date}
		</div>
	</button>

	{#if isGameOpen}
		<div class="crokinole__more-info">
			<div class="crokinole__rounds-time-container">
				<div class="crokinole__rounds">
					Rounds {previousGame.rounds}	
				</div>
				
				<div class="crokinole__time">
					{previousGame.time}
				</div>
			</div>

			{#each previousGame.score as player, index}
				<div class="crokinole__player">
					<div class="crokinole__place"># 
						{index + 1}
					</div>

					<div class="crokinole__name">
						{player.name}
					</div>

					<div class="crokinole__score">
						{player.totalScore}
					</div>	
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.crokinole__previous-game {
		background-color: #212427;
		color: #f8e9cd;
	}

	.crokinole__more-info {
		padding: 1rem 2rem;
		border-top: #f8e9cd solid 0.2rem;
	}

	.crokinole__rounds {
		font-size: 1.8rem;
	}

	.crokinole__date,
	.crokinole__time {
		font-size: 1.2rem;
	}

	.crokinole__player {
		display: grid;
		align-items: center;
		grid-template-columns: 1.5fr 2fr 2fr
	}

	.crokinole__rounds-time-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.crokinole__button {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		border: none;
	}

	.crokinole__header-score {
		font-size: 2.5rem;
	}

	.crokinole__place {
		font-size: 2rem;
	}

	.crokinole__name,
	.crokinole__score {
		font-size: 2.5rem;
	}
</style>