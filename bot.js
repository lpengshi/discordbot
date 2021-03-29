// Run dotenv
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const quotes = require('./quotes');
const list = quotes.getQuotes;
client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
	if (msg.content === '/date') {
		msg.reply(`Today Date: ${new Date()}`);
	} else if (msg.content.substring(0, 1) == '/') {
		let index = Math.floor(Math.random() * 1000);
		msg.reply(`${list[index].author} once said: ${list[index].text}`);
	}
});
