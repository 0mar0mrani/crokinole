<script lang="ts">
	export let handleResetGameClick: void;
	export let handleChangePlayersClick: void;
	export let handleScoreNumberInput: void;
	export let handlePreviousScoreClick: void;
	export let isMenuOpen: boolean;
	export let scoreGoal: number;
</script>

<div class={`menu ${isMenuOpen ? 'menu--open' : ''}`}>
	<div class="menu__score-goal-container">
		<div class="menu__score-goal-header">Score Goal</div>

		<input 
			type="number" 
			class="menu__score-goal-input"
			value={scoreGoal} 
			on:input={handleScoreNumberInput}
		>
	</div>

	<button class="menu__button" on:click={handleResetGameClick}>
		Reset Game
	</button>

	<button class="menu__button" on:click={handleChangePlayersClick}>
		Change Players
	</button>

	<button class="menu__button" on:click={handlePreviousScoreClick}>
		Previous Games
	</button>

	<div class="menu__about">
		<p>Developed by Omar Omrani </p>
		<a href="https://www.paypal.com/paypalme/0mar0mrani" target=”_blank”>Buy Me A Coffee</a>
	</div>
</div>

<style>
	.menu {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
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

	.menu__about {
		display: flex;
		justify-content: center;
		gap: 2rem;
		position: absolute;
		left: 50%;
		bottom: 1rem;
		transform: translateX(-50%);
		width: 100vw;
		font-size: 2.5rem;
	}

	.menu__about p,
	.menu__about a {
		color: inherit;
		text-align: center;
	}

	.menu__score-goal-container {
		max-width: 30rem;
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

	@media screen and (max-width: 550px) {
		.menu__about {
			font-size: 2rem;
		}
	}

	@media screen and (max-width: 450px) {
		.menu__about {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>