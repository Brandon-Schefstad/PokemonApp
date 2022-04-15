// Allows node to use fetch
import fetch from 'node-fetch';
// Imports pokedex array
import { data } from './pokedex.js';
import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

P.getPokemonSpeciesByName('wormadam')
	.then((response) => {
		console.log(response);
	})
	.catch((error) => {
		console.log('There was an ERROR: ', error);
	});
