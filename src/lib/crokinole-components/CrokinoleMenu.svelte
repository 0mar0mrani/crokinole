<script>
	export let visibility;
	export let handler;
	export let handleChangePlayersClick;
</script>

<div class={`crokinole__menu ${visibility ? 'crokinole__menu--open' : ''}`}>
	<button class="crokinole__menu-item-button" on:click={handler}>Reset game</button>

	<button class="crokinole__menu-item-button" on:click={handleChangePlayersClick}>Change Players</button>
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