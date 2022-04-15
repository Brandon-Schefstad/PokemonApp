import Vonage from '@vonage/server-sdk';
import dotenv from 'dotenv/config';
// Allows node to use fetch
import fetch from 'node-fetch';
// Imports pokedex array
import { pokedex } from './pokedex.js';
// Uses random number generator to select a pokemon from the array.
// API restricted to search by name of Pokemon
const searchValue = Math.round(Math.random() * 898);
const pokemonName = pokedex[searchValue - 1].toLowerCase();
// Drafts text message
function makeText(name, type, ability) {
	name = name[0].toUpperCase() + name.slice(1);
	type = type[0].toUpperCase() + type.slice(1);
	ability = ability[0].toUpperCase() + ability.slice(1);
	return `Today's Pokemon is ${name}, with the type of ${type}, whos primary ability is ${ability}`;
}
// Gets data from API
async function contactAPI() {
	console.log(pokemonName);
	let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
	return fetch(url)
		.then((response) => response.json())
		.then((data) => {
			console.log(data.species.name);
			console.log(data.abilities[0].ability.name);
			return {
				name: data.species.name,
				ability: data.abilities[0].ability.name,
				type: data.types[0].type.name,
			};
		});
}
// await console.log(contactAPI());
// Vonage API using environment variables
const vonage = new Vonage({
	apiKey: process.env.APIKEY,
	apiSecret: process.env.APISECRET,
});

// Sends SMS to phone number
async function sendSMS() {
	const textMessage = contactAPI();
	console.log(textMessage);
	// const from = '18776934395';
	// const to = '14077387133';
	// const text = `${pokemonText}`;
	// vonage.message.sendSms(from, to, text, (err, responseData) => {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		if (responseData.messages[0]['status'] === '0') {
	// 			console.log('Message sent successfully.');
	// 		} else {
	// 			console.log(
	// 				`Message failed with error: ${responseData.messages[0]['error-text']}`
	// 			);
	// 		}
	// 	}
	// });
}

sendSMS();
