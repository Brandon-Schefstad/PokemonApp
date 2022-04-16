// Updates webhook with name of selected pokemon
// Bug, not updating webhook 04/15

// Checks user guess to database
// Bug 04/15 not working correctly.
export async function checkPokemon() {
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
