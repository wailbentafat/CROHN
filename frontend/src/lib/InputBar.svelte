<script lang="ts">
	import { AuthState } from './AuthState';
	import { send_message, sending_state } from './MessagesState';

	export let inputValue: string = '';
	const submit = async () => {
		const res = await send_message(inputValue);
		if (!res) return;
		inputValue = '';
	};
</script>

<form on:submit={submit}>
	<input
		type="text"
		bind:value={inputValue}
		placeholder="How Are You Feeling {$AuthState.first_name || ' '}"
	/>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	{#if !$sending_state}
		<button type="submit">
			<img src="/icons/send.svg" alt="send" on:click={submit} />
		</button>
	{:else}
		<button type="button" class='spin' disabled>
			<img src="/icons/wait.svg" alt="send" on:click={submit} />
		</button>
	{/if}
</form>

<style>
	form {
		display: flex;
		gap: 10px;
		padding: 10px;
		padding-left: 20px;
		background-color: var(--background-2);
		border-radius: 100px 100px 100px 5px;
		margin: 10px 20px;
		margin-bottom: 5px;
	}
	input {
		color: #333;
		background-color: transparent;
		border: none;
		width: 100%;
		font-family: inherit;
		font-size: inherit;
	}
	input:focus {
		outline: none;
	}
	input::placeholder{
		color: #999;
	}
	button {
		outline: none;
		background-color: #ffffff;
		border: none;
		border-radius: 100%;
		padding: 5px;
		aspect-ratio: 1/1;
	}
	.spin{
		animation: spin 2s infinite linear;
	}
	@keyframes spin{
		0%{
			transform: rotate(0deg);
		}
		100%{
			transform: rotate(360deg);
		}
	}
	img {
		transform: rotate(-90deg);
		filter: invert(0.6);
		user-select: none;
		cursor: pointer;
	}
</style>
