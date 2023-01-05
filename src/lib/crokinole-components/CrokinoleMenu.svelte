<script>
	export let visibility;
	export let handler;
	export let handleChangePlayersClick;
	export let handleScoreGoalClick;
	export let handleScoreRangeInput;
	export let handleScoreNumberInput;
	export let scoreGoal;
</script>

<div class={`crokinole__menu ${visibility ? 'crokinole__menu--open' : ''}`}>
	<button class="crokinole__menu-item-button" on:click={handler}>Reset Game</button>

	<button class="crokinole__menu-item-button" on:click={handleChangePlayersClick}>Change Players</button>

	<div>
		<div>Score Goal</div>

		<div>
			<input type="number" value={scoreGoal} on:input={handleScoreNumberInput}>
			<input type="range" value={scoreGoal} min="50" max="300" on:input={handleScoreRangeInput}>
		</div>
	</div>

</div>

<style>
	.crokinole__menu {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: red;
		transition: all 0.3s;
		transform: translateX(100%);
	}

	.crokinole__menu--open {
		transform: translateX(0);
	}
</style>