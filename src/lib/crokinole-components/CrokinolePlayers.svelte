<script lang="ts">
	import CloseSVG from "../../assets/svg/CloseSVG.svelte";
	import type { PlayerType } from '../../types';
	
	export let handleAddPlayerClick: (event: MouseEvent) => void;
	export let handleAddPlayerKeydown: (event: KeyboardEvent) => void;
	export let handleStartGameClick: (event: MouseEvent) => void;
	export let handleDeleteClick: (event: MouseEvent) => void;
	export let players: PlayerType[];
	export let isAddPlayersOpen: boolean;
	export let isEnoughPlayers: boolean;
	export let nameInputChild: string;
	export let nameInputElChild: object;
</script>

{#if isAddPlayersOpen}
	<div class="players">
		<div class="players__header">Players</div>

		<div class="players__player-container">
			{#each players as player, index}
				<div class="players__player" data-id={index}>
					<div>
						{player.name}
					</div>

					<button class="players__delete-button" on:click={handleDeleteClick}>
						<CloseSVG/>
					</button>
				</div>
			{/each}
		</div>

		<div class="players__input">
			<input 
				type="text" 
				class="players__input-text"
				on:keydown={handleAddPlayerKeydown}
				bind:value={nameInputChild}
				bind:this={nameInputElChild}
			>

			<button class={`crokinole__button ${nameInputChild !== '' && players.length < 4 ? '' : 'players__button--deactivated'}`} on:click={handleAddPlayerClick}>
				Add player
			</button>
		</div>

		<button
			class={`crokinole__button ${!isEnoughPlayers ? 'players__button--deactivated' : ''}`}
			on:click={handleStartGameClick}
			>Start Game
		</button>
	</div>
{/if}

<style>
	.players {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: #a3622c78;
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);;
		z-index: 200;
	}

	.players__header {
		font-size: 4rem;
		font-weight: 500;
		margin-bottom: 2rem;
		border-bottom: solid 2px #212427;
	}

	.players__player-container {
		height: 16rem;
	}

	.players__player {
		display: flex;
		gap: 4rem;
		justify-content: space-between;
	}

	.players__delete-button {
		width: 4rem;
		height: 4rem;
		border: none;
	}

	.players__input {
		display: flex;
		flex-direction: column;
	}

	.players__input-text {
		border: solid 2px #212427;
		padding-left: 0.5rem;
		text-align: center;
		margin-bottom: 2rem;
	}
	
	.crokinole__button {
		padding: 1rem 2rem;
		background-color: #212427;
		color: #f8e9cd;
		border: none;
		border-radius: 2rem;
	}

	.players__button--deactivated {
		opacity: 0.5;
		pointer-events: none;
	}
</style>