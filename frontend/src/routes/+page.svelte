<script lang="ts">
	import { goto, replaceState } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount((): void => {
		goto('/home', { replaceState: true });
	});
</script>
