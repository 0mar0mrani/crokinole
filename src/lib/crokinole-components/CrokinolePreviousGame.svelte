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
