<script>
	export let visibility;
	export let handler;
	export let currentPlayer;
	export let players;
</script>

{#if players.length > 0}
	<div class={`crokinole__announcement ${visibility ? 'crokinole__announcement--open' : ''}`}>
		<div class="crokinole__announcement-text">{currentPlayer.name} is the winner with {currentPlayer.totalScore} points!</div>

		<button class="crokinole__menu-item-button" on:click={handler}>New game</button>
	</div>
{/if}

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
		background-color: #a3622c78;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);;
	} 

	.crokinole__announcement--open {
		display: flex;
	}

	.crokinole__announcement-text {
		padding: 0 2rem;
	}

	.crokinole__menu-item-button {
		padding: 1rem 2rem;
		border: solid 2px #000;
		border-radius: 2rem;
		align-self: center;
	}
</style>