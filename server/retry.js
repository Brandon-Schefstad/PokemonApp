// Updates webhook with name of selected pokemon
// Bug, not updating webhook 04/15
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
const textMessage = await contactAPI(chosenPokemon);
// Sends SMS to phone number
async function sendSMS(textMessage) {
	const from = '[number]';
	const to = '[number]';
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
}

// Checks user guess to database
// Bug 04/15 not working correctly.
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
