import Vonage from '@vonage/server-sdk';
import 'dotenv/config';
import fetch from 'node-fetch';
import { pokedex } from './pokedex.js';
// Selects a Pokemon from an Array in pokedex.js
function selectPokemon() {
	const searchValue = Math.round(Math.random() * 898);
	return pokedex[searchValue - 1].toLowerCase();
}
//Selected Pokemon and checkpoint
let chosenPokemon = selectPokemon();
console.log(`Chosen Pokemon is ${chosenPokemon}`);

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

const textMessage = await contactAPI(chosenPokemon);

// Vonage API using environment variables
const vonage = new Vonage({
	apiKey: process.env.APIKEY,
	apiSecret: process.env.APISECRET,
});

// Sends SMS to phone number
async function sendSMS(textMessage) {
	const from = '18776934395';
	const to = '14077387133';
	const text = await textMessage;
	console.log(text);
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

await sendSMS(textMessage);
