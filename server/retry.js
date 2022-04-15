import Vonage from '@vonage/server-sdk';
import dotenv from 'dotenv/config';
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
async function makeTextMessage(name, type, ability) {
	// Capitalizing the three arguments
	name = name[0].toUpperCase() + name.slice(1);
	type = type[0].toUpperCase() + type.slice(1);
	ability = ability[0].toUpperCase() + ability.slice(1);
	const response = `Today's Pokemon is ${name}, with the type of ${type}, whos primary ability is ${ability}`;
	console.log(response);
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
		// await console.log(
		// 	pokemonObject.species.name,
		// 	pokemonObject.abilities[0].ability.name,
		// 	pokemonObject.types[0].type.name
		// );
		return await makeTextMessage(
			pokemonObject.species.name,
			pokemonObject.abilities[0].ability.name,
			pokemonObject.types[0].type.name
		);
	} catch (err) {
		console.log('fetch failed', err);
	}
}

const textMessage = await contactAPI(chosenPokemon);
// Returns undefined
console.log(`Text Message is ${textMessage}`);
