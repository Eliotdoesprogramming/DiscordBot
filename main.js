// jshint esversion: 6
const Login = require('./botlogin.json');
const CommandsModule = require('./commands.js');
const HelperModule = require('./helpers.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!';
client.once('ready', () => {
	console.log('bot is online');
});


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	if (command === 'hi') { message.channel.send(`hi <@${message.author.id}>`); }
	else if (command === 'breakout' || command === 'bk') {
		// currently not working, individual command module functions work, but need to
		// implement promises due to their async nature
		const roles = args.shift();
		const rooms = args.shift();
		if (!(typeof roles === 'string' || parseInt(rooms))) {
			message.channel.send('please enter the command !bk [role] [number of rooms]');
			return;
		}
		if (!HelperModule.getRole(message.guild, roles)) {
			message.channel.send('Please enter a valid role');
			return;
		}

		const name = `${roles} breakout`;

		CommandsModule.createRoom(message, name, rooms);
		CommandsModule.distributeToBreakout(message, roles);


	}
	else if (command === 'test') {
		CommandsModule.testing(message);
	}
	else if (command === 'dist') {
		const roles = args.shift();
		if (roles) CommandsModule.distributeToBreakout(message, roles);
		else message.channel.send('no role given, please use !dist [role]');
	}
	else if (command === 'anime') {
		CommandsModule.linkAnime(command);
	}
	else if (command === 'close') {
		CommandsModule.closeBreakout(message);
	}
});

// test
client.login(Login.token);