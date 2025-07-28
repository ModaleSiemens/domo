<script lang="ts">
	import { fly } from 'svelte/transition';

	import { goto } from '$app/navigation';
	import { api } from './api';
	import { setUser } from './stores/auth';
	import type { AuthResponse, LoginRequest } from '../../../types';

	let email: string = '';
	let password: string = '';
	let loading: boolean = false;
	let error: string | null = null;

	async function handleSignIn(): Promise<void> {
		try {
			loading = true;
			error = null;

			const loginData: LoginRequest = { email, password };
			const response = await api.post<AuthResponse>('/api/users/login', loginData);

			setUser(response.user);
			goto('/home');
		} catch (e: any) {
			error = e.err || 'sign in failed';
		}
	}
</script>

<form on:submit|preventDefault={handleSignIn} class="log-in-form">
	<div id="form-fields">
		<p in:fly={{ x: -400, duration: 500 }}>
			<label for="email">email : </label>
			<input
				type="email"
				name="email"
				id="email"
				required
				autocomplete="on"
				disabled={loading}
				bind:value={email}
			/>
		</p>
		<p in:fly={{ x: 400, duration: 500 }}>
			<label for="password">password : </label>
			<input
				type="password"
				name="password"
				id="password"
				required
				autocomplete="on"
				disabled={loading}
				bind:value={password}
			/>
		</p>
	</div>
	{#if error}
		<div class="error">{error}</div>
	{/if}
	<p>
		<button id="form-button" in:fly={{ y: -400, duration: 500 }} disabled={loading}>log in</button>
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
