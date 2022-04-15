import Vonage from '@vonage/server-sdk';
import 'dotenv/config';

document.querySelector('button').addEventListener('click', sendSMS);
console.log(`starting`);
const vonage = new Vonage({
	apiKey: `${process.env.VONAGE_API_KEY}`,
	apiSecret: `${process.env.APISECRET}`,
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
