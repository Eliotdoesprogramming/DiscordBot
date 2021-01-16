const Discord = require('discord.js');

const bot = new Discord.Client();
const prefix = '~';
bot.once('ready' , ()=>{
    console.log('bot is online');
})

bot.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    var args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if(command === '+') message.channel.send(args);
})
















bot.login('Nzk5ODI1MTMyNDgyNTkyNzkw.YAJNMw.m-GP_DpdQZXaqDL8HxHbgfh6b8Y');
