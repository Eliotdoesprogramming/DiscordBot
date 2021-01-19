//jshint esversion: 6
const CommandsModule = require('./commands.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!';
const https = require('https');
client.once('ready', () => {
    console.log('bot is online');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    var args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if (command === 'hi') message.channel.send(`hi <@${message.author.id}>`);
    else if (command === 'breakout') {
        let rooms = args.shift();
        let roles = args.shift();
        createRoom(message, rooms, roles);
    } else if (command === 'test') {
        CommandsModule.testing(message);
    } else if (command === 'distribute') {
        CommandsModule.distributeUsers(message);
    } else if (command === 'anime') {
        CommandsModule.linkAnime(command);
    } else if (command === 'close') {
        CommandsModule.closeBreakout(message);
    }
});













client.login('Nzk5ODI1MTMyNDgyNTkyNzkw.YAJNMw.m-GP_DpdQZXaqDL8HxHbgfh6b8Y');