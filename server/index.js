import Vonage from '@vonage/server-sdk';
import 'dotenv/config';
import fetch from 'node-fetch';
import { pokedex } from './pokedex.js';

// Vonage API using environment variables
const vonage = new Vonage({
	apiKey: process.env.APIKEY,
	apiSecret: process.env.APISECRET,
});

//Selected Pokemon and checkpoint
function selectPokemon() {
	const searchValue = Math.round(Math.random() * 898);
	return pokedex[searchValue - 1].toLowerCase();
}
let chosenPokemon = selectPokemon();
console.log(`Chosen Pokemon is ${chosenPokemon}`);

// Updates webhook with name of selected pokemon
async function updateWebHook(data = { Name: chosenPokemon }) {
	const url = `https://webhook.site/2e5db1d4-b41c-41a7-8ba1-352b31dde0e9?chosenPokemon=${chosenPokemon}`;
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		headers: {
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
}
// Fetches pokeapi using chosenPokemon on line 11
// Bug: Promise is always pending and never resolved.
// Bug solved 4/15
async function contactAPI(chosenPokemon) {
	const url = `https://pokeapi.co/api/v2/pokemon/${chosenPokemon}`;
	try {
		const response = await fetch(url);
		const pokemonObject = await response.json();
		const pokemonArray = [
			pokemonObject.types[0].type.name,
			pokemonObject.abilities[0].ability.name,
			pokemonObject.stats[0].base_stat,
			pokemonObject.stats[1].base_stat,
			pokemonObject.stats[2].base_stat,
			pokemonObject.stats[3].base_stat,
			pokemonObject.stats[4].base_stat,
			pokemonObject.stats[5].base_stat,
		];
		return await makeTextMessage(pokemonArray);
	} catch (err) {
		console.log('fetch failed', err);
	}
}
// Creates a draft of the text message
async function makeTextMessage([
	type,
	ability,
	HP,
	ATK,
	DEF,
	SPATK,
	SPDEF,
	SPEED,
]) {
	// Capitalizing the three arguments
	type = type[0].toUpperCase() + type.slice(1);
	ability = ability[0].toUpperCase() + ability.slice(1);
	const response = `Guess that pokemon! 
	> Main Type:${type} 
	> Primary ability: ${ability}	
	> Stats: HP: ${HP} ATK: ${ATK} DEF: ${DEF} SPATK: ${SPATK} SPDEF: ${SPDEF} SPEED: ${SPEED}`;
	return response;
}

const textMessage = await contactAPI(chosenPokemon);
// Sends SMS to phone number
async function sendSMS(textMessage) {
	const from = '18776934395';
	const to = '14077387133';
	const text = await textMessage;
	console.log(text);
// 	vonage.message.sendSms(from, to, text, (err, responseData) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			if (responseData.messages[0]['status'] === '0') {
// 				console.log('Message sent successfully.');
// 			} else {
// 				console.log(
// 					`Message failed with error: ${responseData.messages[0]['error-text']}`
// 				);
// 			}
// 		}
// 	});
// }

async function checkPokemon() {
	const url = `https://webhook.site/2e5db1d4-b41c-41a7-8ba1-352b31dde0e9?chosenPokemon=${chosenPokemon}`;
	try {
		const response = await fetch(url);
		const textObject = await response.json();
		console.log(textObject);
		if (textObject.name === chosenPokemon) {
			console.log('Youre a winner!');
		}
	} catch {
		console.log('You lose!');
	}
}

async function runProgram() {
	updateWebHook({ Name: chosenPokemon });
	checkPokemon(chosenPokemon);
	sendSMS(textMessage);
}

await runProgram();
