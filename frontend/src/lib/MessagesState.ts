import { writable, type Writable } from 'svelte/store';

export interface Message {
	role: 'user' | 'model';
	text: string;
	id: number;
}

const get_response = async () => {
	const response = await fetch('/api/assistant', {
		method: 'POST',
		body: JSON.stringify(local_message_history.toReversed()),
	})
	let data = await response.text()
	return data
}

export const message_history: Writable<Message[]> = writable([]);
let local_message_history: Message[] = [];
message_history.subscribe((m) => (local_message_history = m));

export const sending_state: Writable<boolean> = writable(false);
let sending_state_local = false;
sending_state.subscribe((val) => (sending_state_local = val));

export const send_message = async (text: string) => {
	if (sending_state_local === true) return false;
	if (text.length < 1) return false;

	// adding user message
	sending_state.set(true);
	message_history.update((messages) => {
		messages.unshift({ role: 'user', text, id: Math.random() });
		return messages;
	});

	let response = (await get_response()).split('\n\n');
	for(let part of response){
		if(!part) continue;
		await new Promise(res => setTimeout(res, 500))
		message_history.update((messages) => {
			messages.unshift({ role: 'model', text: part, id: Math.random() });
			return messages;
		});
	}

	sending_state.set(false);
	return true;
};
