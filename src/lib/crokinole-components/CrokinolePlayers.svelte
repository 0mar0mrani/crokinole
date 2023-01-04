<script>
	export let players;
	export let visibility;
	export let handleAddPlayerClick;
	export let nameInputChild;
</script>

<div class={`crokinole__players ${visibility ? 'crokinole__players--open' : ''}`}>
	<div class="crokinole__player-container">
		{#each players as player, index}
			<div class="crokinole__player">
				<div>
					{`P${index + 1}`}
				</div>

				<div>
					{player.name}
				</div>
			</div>
		{/each}
	</div>

	<div>
		<input type="text" bind:value={nameInputChild} >

		<button
			on:click={handleAddPlayerClick}
			>Add player
		</button>
	</div>

	<button>
		Start Game
	</button>
</div>

<style>
	.crokinole__players {
		display: none;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: red;
	}

	.crokinole__players--open {
		display: flex;
	}

	.crokinole__player {
		display: flex;
	}
</style>