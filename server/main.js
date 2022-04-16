// import Vonage from '@vonage/server-sdk';
// import 'dotenv/config';
// import fetch from 'node-fetch';
import { pokedex } from './pokedex.js';
import * as apiDraft from './api-draft.js';
import * as answercheck from './answer-check.js';
import * as webhook from './update-webhook.js';

async function runProgram() {
	apiDraft.contactAPI(apiDraft.chosenPokemon);
	// webhook.updateWebHook({ Name: chosenPokemon });
	// answercheck.checkPokemon(chosenPokemon);
	apiDraft.sendSMS(apiDraft.textMessage);
}

export const pokemonHint = runProgram();
