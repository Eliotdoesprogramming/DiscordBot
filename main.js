//jshint esversion: 6
const Login = require('./botlogin.json');
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
    else if (command === 'breakout' || command === 'bk') {
        let roles = args.shift();
        let rooms = args.shift();
        if(!( typeof roles ===  'string'|| parseInt(rooms) ))  {
            message.channel.send('please enter the command !bk [role] [number of rooms]');
            return;
        } 
        let name = `${roles} breakout`;

        CommandsModule.createRoom(message, name,rooms);
        CommandsModule.distributeToBreakout(message,roles);


        
    } else if (command === 'test') {
        CommandsModule.testing(message);
    } else if (command === 'dist') {
        let roles = args.shift();
        if(roles)CommandsModule.distributeToBreakout(message, roles);
        else message.channel.send('no role given, please use !dist [role]');
    } else if (command === 'anime') {
        CommandsModule.linkAnime(command);
    } else if (command === 'close') {
        CommandsModule.closeBreakout(message);
    }
});
//l2usepromisenow
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }








client.login(Login.token);