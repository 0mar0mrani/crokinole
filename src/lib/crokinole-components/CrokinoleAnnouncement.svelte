<script>
	export let visibility;
	export let handler;
	export let currentPlayer;
</script>

<div class={`crokinole__announcement ${visibility ? 'crokinole__announcement--open' : ''}`}>
	<div>{currentPlayer.name} is the winner with {currentPlayer.score} points</div>

	<button class="crokinole__menu-item-button" on:click={handler}>New game</button>

	<button class="crokinole__menu-item-button">New game and players</button>
</div>

<style>
	.crokinole__announcement {
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

		background-color: rebeccapurple;
	} 

	.crokinole__announcement--open {
		display: flex;
	}
</style>