<script lang="ts">
	let { children } = $props();
</script>

<div class="main-wrapper">
	<header>
		<div id="logo-name-wrapper">
			<img src="/logo.png" alt="logo del sito" id="logo" />
			<h1 id="site-name">domo</h1>
		</div>
		<p id="tagline">comodità virtuali per la casa</p>
	</header>
	<main>
		{@render children?.()}
	</main>
</div>

<style>
	.main-wrapper {
		display: flex;

		flex-direction: column;

		position: fixed;
		inset: 0;
		height: 100vh;

		background-color: aliceblue;
	}

	main {
		display: flex;
		flex-direction: column;

		justify-content: space-between;
		align-items: center;

		flex: 1;
	}

	header {
		display: flex;

		align-items: center;

		justify-content: space-between;

		padding: 2rem 2rem;

		color: white;
		background: blueviolet;
	}

	#logo-name-wrapper {
		display: flex;

		justify-content: center;
		align-items: center;
	}

	#logo {
		height: 10em;

		margin: 0em 2em 0em 0em;
	}

	#site-name {
		font-size: 5rem;
	}

	#tagline {
		font-size: 2.5em;
	}

	@media (max-width: 945px) {
		header {
			flex-direction: column;
			align-items: center;
			text-align: center;

			justify-content: space-between;
		}

		#site-name {
			position: static;
			transform: none;
			margin-bottom: 0.5rem;
		}
	}
</style>
