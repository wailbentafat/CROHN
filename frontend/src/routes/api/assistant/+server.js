// this file is actually ran on the server in order to keep the api key hidden
import { GoogleGenerativeAI } from '@google/generative-ai';

// put in a .env file in /
import { geminiKey } from '$env/static/private';
import { text } from '@sveltejs/kit';

const genAI = new GoogleGenerativeAI(geminiKey);

const target_questions = [
	'overall mood and emotional well-being on a scale of 1 to 10 for the past two weeks',
	'Have you experienced any significant stressors or changes in your life recently? If yes, please describe',
	'Are you experiencing any symptoms of anxiety or depression, such as difficulty sleeping, changes in appetite, or loss of interest in activities you usually enjoy?',
	"Have you noticed any changes in your Crohn's symptoms over the past two weeks? If yes, please describe.",
	'On a scale of 1 to 10, how would you rate your energy levels and overall physical well-being?',
	'Have you experienced any abdominal pain, cramping, diarrhea, or other gastrointestinal symptoms? If yes, please describe the frequency and severity.',
	'How would you rate your appetite and ability to eat a balanced diet over the past two weeks?',
	'Have you noticed any changes in your dietary triggers or food intolerances? If yes, please specify.',
	'Are you able to maintain your hydration levels adequately? If not, what challenges are you facing?',
];

const assistant = genAI.getGenerativeModel({
	model: 'gemini-1.5-pro-latest',
	systemInstruction: `
	Crohn's disease is a chronic (long-lasting) disease that causes inflammation in your digestive tract. It can affect any part of your digestive tract, which runs from your mouth to your anus. But it usually affects your small intestine and the beginning of your large intestine.
    you are a trained nurse you have had extensive education and are now working with a crohn's patiate. your ultimate goal is to help them heal and to keep them comfortable by being the neicest care taker they can have. your job is also to help the user better understand his situation and symptoms.
	first start by informing the user that you are preforming a survey, ask for permission then you must gather ${
		target_questions.length
	} data points on the patiente the question you must ask are ${target_questions.join(
		'\n> '
	)}.\n do not push the questions make some light conversation about and offer sincere reactions. the goal of these questions is to provide an accurate evaluation of their state and give appropriate advice. after the questions are over, tell the patients that they can talk with you about anything related to their health or curiocity about the subjects.
	the message format is that you keep your messages short and consise and only use regular text. only use friendly emojis rarely when it is appropriate. use double line breaks to send multiple messages when necessary.
    `.replace(/\s{2,}/g, ' '),
});

// @ts-ignore
const get_response = async (messages) => {
	// @ts-ignore
	const history = messages.map((m) => ({
		role: m.role == 'user' ? 'user' : 'model',
		parts: [{ text: m.text || '...' }],
	}));

	const chat = assistant.startChat({
		history,
	});
	for (let i = 0; i < 5; i++) {
		try {
			const result = await chat.sendMessage('system: continue');
			return result.response.text();
		} catch (err) {
			console.error(err);
			await new Promise((res) => setTimeout(res, 3000));
		}
	}

	return '';
};

const system_bot = genAI.getGenerativeModel({
	model: 'gemini-1.5-pro-latest',
	systemInstruction:
		`you are a system bot tasked with assisting the completion of a nurse's task to question the patient about ${target_questions.length} questions.  
	when asked for the patients response to a question either answer with "false" if you can't decide from the chat history or by giving the answer the patient made
	`.replace(/\s{2,}/g, ' '),
});

// @ts-ignore
const test_completion = async (messages) => {
	for (let question of target_questions) {
		// @ts-ignore
		const system_prompt = `message_history: {${messages.map((message) => {
			return `{role: ${message.role}, text: ${message.text}},`;
		})}},
			instruction: determine if the patient has answerd the following question ${question}
			return false if not, return the answer if yes
		`;
		for (let i = 0; i < 5; i++) {
			try {
				const result = await system_bot.generateContent(system_prompt);
				const response = await result.response;
				const text = response.text();
				console.log(text);
				i = 5;
			} catch (err) {
				console.error(err);
				await new Promise((res) => setTimeout(res, 3000));
			}
		}
		// add these into an array and wait until they are all done
		// once all the data is collected send to the specialized model we trained
		// it will give specialized instructions that comforts the user and make sure they are on the right track to recovery
	}
};

// @ts-ignore
export async function POST({ request }) {
	const messages = await request.json();
	// if (messages.length > 10) await test_completion(messages);
	return text(await get_response(messages));
}
