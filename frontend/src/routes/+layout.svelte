<script lang="ts">
	let { children } = $props();
</script>

<div class="main-wrapper">
	{@render children?.()}
</div>

<style>
	.main-wrapper {
		position: fixed;
		inset: 0;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

    background-color: aliceblue;
	}
</style>
