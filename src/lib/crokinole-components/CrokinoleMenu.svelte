<script lang="ts">
	export let handleResetGameClick: void;
	export let handleChangePlayersClick: void;
	export let handleScoreNumberInput: void;
	export let handlePreviousScoreClick: void;
	export let isMenuOpen: boolean;
	export let scoreGoal: number;
</script>

<div class={`menu ${isMenuOpen ? 'menu--open' : ''}`}>
	<button class="menu__button" on:click={handleResetGameClick}>
		Reset Game
	</button>

	<button class="menu__button" on:click={handleChangePlayersClick}>
		Change Players
	</button>

	<button class="menu__button" on:click={handlePreviousScoreClick}>
		Previous Games
	</button>

	<div class="menu__score-goal-container">
		<div class="menu__score-goal-header">Score Goal</div>

		<input 
			type="number" 
			class="menu__score-goal-input"
			value={scoreGoal} 
			on:input={handleScoreNumberInput}
		>
	</div>

</div>

<style>
	.menu {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: #a3622c78;
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);;
		transition: all 0.3s;
		transform: translateX(100%);
	}

	.menu--open {
		transform: translateX(0);
	}

	.menu__button {
		padding: 1rem 2rem;
		background-color: #212427;
		color: #f8e9cd;
		border: none;
		border-radius: 2rem;
		align-self: center;
	}

	.menu__score-goal-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.menu__score-goal-header {
		text-align: center;
		margin-bottom: 0.5rem;
	}

	.menu__score-goal-input {
		border: solid 2px #212427;
		width: 50%;
		text-align: center; 
	}
</style>