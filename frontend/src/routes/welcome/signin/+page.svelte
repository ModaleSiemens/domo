<script lang="ts">
	import { fly } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { updated } from '$app/state';

	interface Props {
		form?: {
			email?: string;
			incorrect?: boolean;
			error?: boolean;
			message?: string;
		};
	}

	let { form }: Props = $props();
	let loading = $state(false);
</script>

<form
	method="POST"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	}}
	class="sign-in-form"
>
	<div id="form-fields">
		<p in:fly={{ x: -400, duration: 500 }}>
			<label for="email">email : </label>
			<input
				type="email"
				name="email"
				id="email"
				required
				autocomplete="email"
				disabled={loading}
				value={form?.email ?? ''}
			/>
		</p>
		<p in:fly={{ x: 400, duration: 500 }}>
			<label for="password">password : </label>
			<input
				type="password"
				name="password"
				id="password"
				required
				autocomplete="current-password"
				disabled={loading}
			/>
		</p>
	</div>
	{#if form?.incorrect}
		<div class="error">email o password non valide</div>
	{/if}

	{#if form?.error && !form?.incorrect}
		<div class="error">{form.message || 'accesso fallito'}</div>
	{/if}
	<p>
		<button id="form-button" type="submit" in:fly={{ y: -400, duration: 500 }} disabled={loading}
			>{loading ? 'signing in' : 'sign in'}</button
		>
	</p>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: center;

		background-color: rgba(137, 43, 226, 0.589);

		border-radius: 16px;

		color: white;

		padding: 16px;

		text-align: right;
	}

	#form-button {
		background-color: white;

		border: none;

		font-size: 1rem;

		color: blueviolet;

		border-radius: 16px;

		padding: 8px;
	}
</style>
