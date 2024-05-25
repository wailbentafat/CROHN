import axios from 'axios';
import { onMount } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export interface TimelineEvent {
	type: string;
	content: string;
	date: Date;
	link: string;
}
// fake filler data
// the issue we encountered is with jwt authorization headers
export const TimelineState: Writable<TimelineEvent[]> = writable([
	{type: 'doctor visit', content: 'i visited a doctor and he gave me these files and medecine to take for the next couple of weeks', date: new Date(Math.floor(Math.random()*1716631125988)), link: 'https://google.com'},
    {type: 'lab test', content: 'I had a blood test done at the lab', date: new Date(Math.floor(Math.random()*1716631125988)), link: 'https://google.com'},
    {type: 'prescription', content: 'Received new prescription for high blood pressure', date: new Date(Math.floor(Math.random()*1716631125988)), link: 'https://google.com'},
    {type: 'therapy session', content: 'Had a therapy session for my back pain', date: new Date(Math.floor(Math.random()*1716631125988)), link: 'https://google.com'},
    {type: 'vaccination', content: 'Received my COVID-19 vaccination', date: new Date(Math.floor(Math.random()*1716631125988)), link: 'https://google.com'},
    {type: 'doctor visit', content: 'Follow-up visit with the doctor about my surgery', date: new Date(Math.floor(Math.random()*1716631125988)), link: 'https://google.com'},
    {type: 'physical therapy', content: 'Attended physical therapy for my knee', date: new Date(Math.floor(Math.random()*1716631125988)), link: 'https://google.com'},
    {type: 'dentist appointment', content: 'Went to the dentist for a regular check-up', date: new Date(Math.floor(Math.random()*1716631125988)), link: 'https://google.com'},
    {type: 'eye exam', content: 'Had an eye exam and got a new prescription for glasses', date: new Date(Math.floor(Math.random()*1716631125988)), link: 'https://google.com'},
    {type: 'nutritionist appointment', content: 'Met with a nutritionist to discuss diet changes', date: new Date(Math.floor(Math.random()*1716631125988)), link: 'https://google.com'},
	
]);
/*
axios.get('https://b449-105-99-114-244.ngrok-free.app/medical/get_all', {
	headers: {
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxNjYzMDQ1MSwianRpIjoiNTY2M2I0MmItNWUzOS00Zjk2LThkOTktOGY0MTRjNDdjZWIyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6MSwiZW1haWwiOiJlbWFpbCJ9LCJuYmYiOjE3MTY2MzA0NTEsImNzcmYiOiI0MWI4MTBiOS0zZWY0LTQyOTctYjkzMS0zY2VmMmEwYWFjYmIiLCJleHAiOjE3MTY2MzEzNTF9.cXUrhsClS2XY7YxX6qcw_iRj_4MpTHctBosidGe-Ez4',
	},
}).then(res => {
	if(res.status !== 200) return;
	res.json().then(data => {
		// TODO map data to TimelineState store
	})
}
}).catch(console.error);
*/

export const upload_file = (file: File) => {
	axios.post('https://b449-105-99-114-244.ngrok-free.app/medical/put_files', {
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxNjYzMDQ1MSwianRpIjoiNTY2M2I0MmItNWUzOS00Zjk2LThkOTktOGY0MTRjNDdjZWIyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6MSwiZW1haWwiOiJlbWFpbCJ9LCJuYmYiOjE3MTY2MzA0NTEsImNzcmYiOiI0MWI4MTBiOS0zZWY0LTQyOTctYjkzMS0zY2VmMmEwYWFjYmIiLCJleHAiOjE3MTY2MzEzNTF9.cXUrhsClS2XY7YxX6qcw_iRj_4MpTHctBosidGe-Ez4',
		},
		file: file,
		description: 'uploaded file the ' + new Date().toDateString(),
	}).then(console.log).catch(console.error);
};
