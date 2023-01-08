<script>
	import Crokinole from '../lib/Crokinole.svelte';
</script>

<div class="container">	
	<Crokinole/>

	
	<div class="crokinole__board">
		<div class="crokinole__inner-circle"></div>
		<div class="crokinole__outer-circle"></div>
		<div class="crokinole__line-top"></div>
		<div class="crokinole__line-right"></div>
		<div class="crokinole__line-bottom"></div>
		<div class="crokinole__line-left"></div>
	</div>
</div>

<style>
	.container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100dvw;
		height: 100dvh;
		background-image: url('/src/assets/background.jpg');
		background-size: cover;
		overflow: hidden;
	}

	.crokinole__board {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		aspect-ratio: 1 / 1;
	}

	.crokinole__inner-circle {
		position: absolute;
		border: solid rgb(255, 255, 255, 0.2) 6px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 20%;
		aspect-ratio: 1 / 1;
		border-radius: 100%;
		z-index: 0;
	}

	.crokinole__outer-circle {
		position: absolute;
		border: solid rgb(255, 255, 255, 0.2) 6px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
		aspect-ratio: 1 / 1;
		border-radius: 100%;
		z-index: 0;
	}

	.crokinole__line-left,
	.crokinole__line-right,
	.crokinole__line-bottom,
	.crokinole__line-top {
		position: absolute;
		border: solid rgb(255, 255, 255, 0.2) 4px;
	}


	.crokinole__line-left{
		top: 50%;
		left: -95%;
		width: 100%;
		transform: translateY(-50%);
	}

	.crokinole__line-right{
		top: 50%;
		right: -95%;
		width: 100%;
		transform: translateY(-50%);
	}

	.crokinole__line-top{
		top: -143.5%;
		left: 50%;
		transform: translateX(-50%);
		height: 149%;
	}

	.crokinole__line-bottom{
		bottom: -94.5%;
		left: 50%;
		transform: translateX(-50%);
		height: 100%;
	}
</style>