import { pokedex } from './pokedex.js';
var newPoke;
document
	.querySelector('.card__getPokemon')
	.addEventListener('click', runProgram);

document.querySelector('.card__submit').addEventListener('click', winner);

//SELECT A POKEMON
function selectPokemon() {
	const searchValue = Math.round(Math.random() * 898);
	return pokedex[searchValue - 1].toLowerCase();
}

// FETCH FLAVORTEXT
async function contactAPISpecies(newPoke) {
	const url = `https://pokeapi.co/api/v2/pokemon-species/${newPoke}`;
	try {
		const response = await fetch(url);
		const pokemonObject = await response.json();
		const englishFlavorText = await filterFlavor(pokemonObject);
		const filteredName = englishFlavorText;
		let firstEnglishFlavorText = await filteredName[0].flavor_text;
		const adjustedfirstEnglishFlavorText =
			await firstEnglishFlavorText.replaceAll('\n', ' ');
		document.querySelector('.flavorText').innerText =
			adjustedfirstEnglishFlavorText;
	} catch (err) {
		console.log('fetch failed', err);
	}
}

// englishFlavorText is an object
// Bug 04/16: Not filtering out arrays with name of newPoke
async function filterName(englishFlavorText) {
	console.log(englishFlavorText);
	const englishFilteredFlavorText = await anonFilter(englishFlavorText);
	console.log(
		`English Filtered Text Is: ${await englishFilteredFlavorText[0]
			.flavor_text}`
	);
	return englishFilteredFlavorText;
}
// Filters out non-English flavor text
async function filterFlavor(pokemonObject) {
	const allEnglishEntries = pokemonObject.flavor_text_entries.filter(
		(x) => x.language.name === 'en'
	);
	return allEnglishEntries;
}

// Bug: Promise is always pending and never resolved.
// Bug solved 04/15, use awaits.
async function contactAPI(newPoke) {
	const url = `https://pokeapi.co/api/v2/pokemon/${newPoke}`;
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
		return await makePokeHint(pokemonArray);
	} catch (err) {
		console.log('fetch failed', err);
	}
}

// DRAFTS TEXT MESSAGE USING pokemonArray
async function makePokeHint([
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
	document.querySelector('.item1').innerText = `Primary Type: ${type}`;
	document.querySelector('.item2').innerText = `Primary Ability: ${ability}`;
	document.querySelector('.item3').innerText = `HP: ${HP}`;
	document.querySelector('.item4').innerText = `ATK: ${ATK}`;
	document.querySelector('.item5').innerText = `DEF: ${DEF}`;
	document.querySelector('.item6').innerText = `SP.ATK: ${SPATK}`;
	document.querySelector('.item7').innerText = `SP.DEF: ${SPDEF}`;
	document.querySelector('.item8').innerText = `SPEED: ${SPEED}`;
}

async function runProgram() {
	document.querySelector('.card--lose').classList.add('hidden');
	newPoke = selectPokemon();
	console.log(`Chosen Pokemon Is ${newPoke}`);
	contactAPISpecies(newPoke);
	contactAPI(newPoke);
}
async function winner() {
	await checkAnswer(newPoke);
}
async function checkAnswer(newPoke) {
	const userAnswer = document.querySelector('.card__input').value;
	console.log(userAnswer);
	console.log(newPoke);
	if (userAnswer.toLowerCase() === newPoke.toLowerCase()) {
		document.querySelector('.card--lose').classList.remove('hidden');
		document.querySelector(
			'.card--lose'
		).innerText = `Correct! Answer is ${(newPoke =
			newPoke[0].toUpperCase() + newPoke.slice(1))}`;
	} else {
		document.querySelector('.card--lose').classList.remove('hidden');
		document.querySelector(
			'.card--lose'
		).innerText = `Incorrect! Answer is ${(newPoke =
			newPoke[0].toUpperCase() + newPoke.slice(1))}`;
	}
}
