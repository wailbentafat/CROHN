<script>
	// @ts-nocheck

	import InputBar from '$lib/InputBar.svelte';
	import Message from '$lib/Message.svelte';

	import { message_history } from '$lib/MessagesState';

	let inputValue = '';
</script>

<main>
	{#if $message_history.length > 0}
		<div id="container">
			{#each $message_history as message (message.id)}
				<Message {message} />
			{/each}
		</div>
	{:else}
		<div id="splash">
			<img src="favicon.png" id='favicon' alt="" />
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div id="suggestions">
				<div
					on:click={(e) => {
						inputValue = "I don't feel okay";
					}}
				>
					I don't feel okay
					<img
						src="/icons/message-circle-question.svg"
						alt="question mark"
					/>
				</div>
				<div
					on:click={(e) => {
						inputValue = 'what is corhns desease';
					}}
				>
					what is corhns desease
					<img
						src="/icons/message-circle-question.svg"
						alt="question mark"
					/>
				</div>
				<div
					on:click={(e) => {
						inputValue = 'corhns desease symptoms';
					}}
				>
					corhns desease symptoms
					<img
						src="/icons/message-circle-question.svg"
						alt="question mark"
					/>
				</div>
				<div
					on:click={(e) => {
						inputValue = 'is corhns deseas recoverable';
					}}
				>
					is corhns deseas recoverable
					<img
						src="/icons/message-circle-question.svg"
						alt="question mark"
					/>
				</div>
			</div>
		</div>
	{/if}
	<InputBar {inputValue} />
	<a id="info" href="/privacy">all your message are kept private</a>
</main>

<style>
	main {
		height: 100%;
		overflow: hidden;
		display: grid;
		grid-template-rows: 1fr 70px auto;
	}
	#container {
		overflow-y: scroll;
		padding: 10px;
		scrollbar-width: thin;
		display: flex;
		flex-direction: column-reverse;
	}
	#splash {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0 40px;
		text-align: center;
		gap: 20px;
	}
	#favicon{
		width: 180px;
	}
	#suggestions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 12px 10px;
	}
	#suggestions div {
		color: #444;
		font-weight: 300;
		background: white;
		border: solid #bbb 1px;
		border-radius: 15px;
		padding: 10px;
		display: flex;
		text-align: left;
		justify-content: center;
		align-items: center;
		box-shadow: #fff1 0 5px 5px;
		user-select: none;
		cursor: pointer;
	}
	@media (max-width: 500px) {
		#suggestions {
			grid-template-columns: 1fr;
		}
		#suggestions div {
			padding: 20px 10px;
		}
	}
	#suggestions img{
		display: inline;
		margin-left: 10px;
	}
	#info {
		width: fit-content;
		margin: 2px auto;
		font-size: 12px;
		color: var(--text-2);
		padding-bottom: 5px;
	}
</style>
