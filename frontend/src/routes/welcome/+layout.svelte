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

<div class="welcome-wrapper">
	<main>
		<SwitchableButtons
			options={['sign up', 'sign in']}
			on_option_selected={handleSwitchChange}
			selected_option={isLogin ? 1 : 0}
		/>
		{@render children?.()}
	</main>
</div>

<style>
	.welcome-wrapper {
		position: fixed;
		inset: 0;
		background-size: cover;
		background-position: center;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		background-image: url('/flowery-meadow-and-sky-background.webp');
	}
</style>
