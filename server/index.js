import Vonage from '@vonage/server-sdk';
import dotenv from 'dotenv/config';
// Imports pokedex array
import { data } from './pokedex.js';
// Uses random number generator to select a pokemon from the array.
// API restricted to search by name of Pokemon
const searchValue = Math.round(Math.random() * 898);
console.log(searchValue, data[searchValue]);

// Vonage API using environment variables
const vonage = new Vonage({
	apiKey: process.env.API_KEY,
	apiSecret: process.env.APISECRET,
});
function sendSMS() {
	console.log(`sending SMS`);
	const from = '18776934395';
	const to = '14077387133';
	const text = 'Testing from VSCode!';
	vonage.message.sendSms(from, to, text, (err, responseData) => {
		if (err) {
			console.log(err);
		} else {
			if (responseData.messages[0]['status'] === '0') {
				console.log('Message sent successfully.');
			} else {
				console.log(
					`Message failed with error: ${responseData.messages[0]['error-text']}`
				);
			}
		}
	});
}

// sendSMS();
