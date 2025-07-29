<!-- <script lang="ts">
	import { fly } from 'svelte/transition';

	import { goto } from '$app/navigation';
	import { api } from '$lib/api';
	import { setUser } from '$lib/stores/auth';
	import type { AuthResponse, RegisterRequest } from '../../../../../types';

	let email: string = '';
	let password: string = '';
	let confirmPassword: string = '';
	let name: string = '';
	let loading: boolean = false;
	let error: string | null = null;

	async function handleSignUp(): Promise<void> {
		if (password !== confirmPassword) {
			error = 'passwords do not match';
			return;
		}

		try {
			loading = true;
			error = null;

			const registerData: RegisterRequest = { email, password, name };
			const response = await api.post<AuthResponse>('/users/register', registerData);

			setUser(response.user);
			goto('/home');
		} catch (e: any) {
			error = e.err || 'sign up failed';
		} finally {
			loading = false;
		}
	}
</script>

<form on:submit|preventDefault={handleSignUp} class="sign-up-form">
	<div id="form-fields">
		<p in:fly={{ x: 400, duration: 500 }}>
			<label for="name">name : </label>
			<input
				type="text"
				name="name"
				id="name"
				required
				autocomplete="on"
				disabled={loading}
				bind:value={name}
			/>
		</p>
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
		<p in:fly={{ x: 400, duration: 500 }}>
			<label for="confirm-password">confirm password : </label>
			<input
				type="password"
				name="confirm-password"
				id="confirm-password"
				required
				autocomplete="on"
				disabled={loading}
				bind:value={confirmPassword}
			/>
		</p>
	</div>
	{#if error}
		<div class="error">{error}</div>
	{/if}
	<p>
		<button id="form-button" in:fly={{ y: -400, duration: 500 }}>sign up</button>
	</p>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: center;

		background-color: rgba(137, 43, 226, 0.6);

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
</style> -->

<script lang="ts">
	import { fly } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { updated } from '$app/state';

	interface Props {
		form?: {
			name?: string;
			error?: boolean;
			message?: string;
		};
	}

	let { form }: Props = $props();

	let email = $state('');
	let confirm_email = $state('');

	let password = $state('');
	let confirm_password = $state('');

	let emailsMatch = $derived(email === confirm_email);
	let passwordsMatch = $derived(password === confirm_password);

	let loading = $state(false);
</script>

<form
	method="POST"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
      password = confirm_password = '';
      confirm_email = '';

			loading = false;
			await update();
		};
	}}
	class="sign-up-form"
>
	<div id="form-fields">
		<p in:fly={{ x: -400, duration: 500 }}>
			<label for="name">name : </label>
			<input
				type="text"
				name="name"
				id="name"
				required
				autocomplete="username"
				disabled={loading}
				value={form?.name ?? ''}
			/>
		</p>
		{#if !emailsMatch}
			<p class="email-match-error">le email devono combaciare</p>
		{/if}
		<p in:fly={{ x: -400, duration: 500 }}>
			<label for="email">email : </label>
			<input
				type="email"
				name="email"
				id="email"
				required
				autocomplete="off"
				disabled={loading}
				bind:value={email}
			/>
		</p>
		<p in:fly={{ x: -400, duration: 500 }}>
			<label for="confirm-email">confirm email : </label>
			<input
				type="email"
				name="confirm-email"
				id="confirm-email"
				required
				autocomplete="off"
				disabled={loading}
				bind:value={confirm_email}
			/>
		</p>
		{#if !passwordsMatch}
			<p class="password-match-error">le password devono combaciare</p>
		{/if}
		<p in:fly={{ x: 400, duration: 500 }}>
			<label for="password">password : </label>
			<input
				type="password"
				name="password"
				id="password"
				required
				autocomplete="off"
				disabled={loading}
				bind:value={password}
			/>
		</p>
		<p in:fly={{ x: 400, duration: 500 }}>
			<label for="confirm-password">confirm password : </label>
			<input
				type="password"
				name="confirm-password"
				id="confirm-password"
				required
				autocomplete="off"
				disabled={loading}
				bind:value={confirm_password}
			/>
		</p>
	</div>
	{#if form?.error}
		<div class="error">{form.message || 'registrazione fallita'}</div>
	{/if}
	<p>
		<button id="form-button" type="submit" in:fly={{ y: -400, duration: 500 }} disabled={loading}
			>{loading ? 'signing up' : 'sign up'}</button
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
