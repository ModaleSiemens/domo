<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import SwitchableButtons from '$lib/SwitchableButtons.svelte';

	const isLogin = $derived(page.route.id?.includes('/signin') ?? false);

	function handleSwitchChange(index: number): void {
		if (index == 0) {
			goto('/welcome/signup', { replaceState: true });
		} else {
			goto('/welcome/signin', { replaceState: true });
		}
	}

	let { children } = $props();
</script>

<main>
	<div class="spacer"></div>
	<SwitchableButtons options={['sign up', 'sign in']} on_option_selected={handleSwitchChange} selected_option={isLogin? 1 : 0}/>
	{@render children?.()}
</main>

<style>
	:global(body) {
		margin: 0;

		background-image: url('/flowery-meadow-and-sky-background.webp');

		background-repeat: no-repeat;
		background-size: cover;

		height: 100vh;

		display: flex;

		justify-content: start;
		align-items: center;

		flex-direction: column;
	}

	.spacer {
		height: 25vh;
	}
</style>
