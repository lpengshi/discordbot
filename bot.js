// Run dotenv
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const list = require('./quotes').getQuotes;
const axios = require('axios');
const apiKey = require('./apiKey').getApiKey;
const baseUrl = 'https://www.googleapis.com/youtube/v3/search';

client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
	if (msg.content === '/date') {
		msg.reply(`Today Date: ${new Date()}`);
	} else if (msg.content.substring(0, 3) == '/4d') {
		let index = Math.floor(Math.random() * 10000);
		msg.reply(`Predicted 4d Number: ${index}`);
	} else if (msg.content.substring(0, 5) == '/vid-') {
		let query = encodeURI(msg.content.substring(5, msg.content.length));
		console.log(query);
		youtubeSearch(query).then((data) => {
			const url = data.id.videoId;
			msg.reply(`Watch youtube at https://www.youtube.com/watch?v=${url}`);
		});
	} else if (msg.content.substring(0, 6) == '/quote') {
		let index = Math.floor(Math.random() * 1000);
		msg.reply(`${list[index].author} once said: ${list[index].text}`);
	}
});

// calling google youtube api
async function youtubeSearch(query) {
	let data;
	let config = {
		method: 'get',
		url: `${baseUrl}?part=snippet&q=${query}&order=viewCount&maxResults=1&key=${apiKey}`,
	};
	data = await axios(config)
		.then((response) => {
			return response.data.items[0];
		})
		.catch((error) => {
			console.log(error);
		});

	return data;
}
