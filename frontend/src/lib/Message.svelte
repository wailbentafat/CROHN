<script lang="ts">
	import { message_history, type Message } from '$lib/MessagesState';

	export let message: Message = {
		role: 'model',
		text: 'ERROR',
		id: Math.random(),
	};
	let bellow = false;
	let above = false;
	message_history.subscribe((messages) => {
		let index = messages.indexOf(message);
		if (typeof messages[index - 1] != 'undefined')
			if (messages[index - 1].role == message.role) bellow = true;
		if (typeof messages[index + 1] != 'undefined')
			if (messages[index + 1].role == message.role) above = true;
	});

	const clacStyle = (above: boolean, bellow: boolean) => {
		let style = '';
		style +=
			message.role === 'model'
				? 'margin-right: auto;'
				: 'margin-left: auto;';

		if (message.role === 'user')
			style += `border-radius: 20px ${above ? '5px' : '20px'} ${bellow ? '5px' : '20px'} 20px`;
		else
			style += `border-radius: ${above ? '5px' : '20px'} 20px 20px ${bellow ? '5px' : '20px'}`;

		if (message.role == 'user') style += ';background-color: #EBABFF; color: #333';

		return style;
	};
</script>

<main style={clacStyle(above, bellow)}>
	{message.text}
</main>

<style>
	main {
		max-width: 80%;
		display: flex;
		margin: 2px;
		padding: 10px;
		background-color: var(--background-1);
		animation: appear 0.3s ease-in-out;
		box-shadow: #00000007 0 5px 15px;
	}
	@keyframes appear {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
