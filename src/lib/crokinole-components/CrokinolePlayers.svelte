<script>
	import CloseSVG from "./CloseSVG.svelte";

	export let players;
	export let visibility;
	export let handleAddPlayerClick;
	export let nameInputChild;
	export let handleStartGameClick;
	export let handleDeleteClick;
	export let isEnoughPlayers;
</script>

<div class={`crokinole__players ${visibility ? 'crokinole__players--open' : ''}`}>
	<div class="crokinole__header">Change Players</div>

	<div class="crokinole__player-container">
		{#each players as player, index}
			<div class="crokinole__player" data-id={index}>
				<div>
					{player.name}
				</div>

				<button
					class="crokinole__player-delete-button"
					on:click={handleDeleteClick}>
					<CloseSVG/>
				</button>
			</div>
		{/each}
	</div>

	<div class="crokinole__input">
		<input 
			type="text" 
			class="crokinole__input-text"
			bind:value={nameInputChild}
		>

		<button
			class={`crokinole__button ${nameInputChild !== '' && players.length < 4 ? '' : 'crokinole__button--deactivated'}`}
			on:click={handleAddPlayerClick}
			>Add player
		</button>
	</div>

	<button
		class={`crokinole__button ${!isEnoughPlayers ? 'crokinole__button--deactivated' : ''}`}
		on:click={handleStartGameClick}
		>Start Game
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
		background-color: #a3622c78;
		backdrop-filter: blur(10px);
		z-index: 200;
	}

	.crokinole__players--open {
		display: flex;
	}

	.crokinole__header {
		font-size: 4rem;
		font-weight: 500;
		margin-bottom: 2rem;
		border-bottom: solid 2px #000;
	}

	.crokinole__player-container {
		height: 16rem;
	}

	.crokinole__player {
		display: flex;
		gap: 4rem;
		justify-content: space-between;
	}

	.crokinole__player-delete-button {
		width: 4rem;
		height: 4rem;
		border: none;
	}

	.crokinole__input {
		display: flex;
		flex-direction: column;
	}

	.crokinole__input-text {
		border: solid 2px #000;
		padding-left: 0.5rem;
		text-align: center;
	}
	
	.crokinole__button {
		padding: 1rem 2rem;
		border: solid 2px #000;
		border-radius: 2rem;
		margin-top: 2rem;
	}

	.crokinole__button--deactivated {
		opacity: 0.5;
		pointer-events: none;
	}
</style>