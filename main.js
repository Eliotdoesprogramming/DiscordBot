const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!';
const https = require('https');
client.once('ready' , ()=>{
    console.log('bot is online');
})

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    var args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if(command === 'hi') message.channel.send(`hi <@${message.author.id}>`);
    else if (command === 'breakout'){
        let rooms = args.shift();
        let roles = args.shift();
        createRoom(message, rooms, roles);
        moveUsers(message,rooms, roles);
    }
    else if (command === 'anime'){
        linkAnime(command);
    }
    else if (command === 'close'){
      closeBreakout(message);
    }
})

createRoom = (message,rooms,roles) => {
    let server = message.guild;
    
    for(let i = 1; i<=rooms; i++){
        let name = `${roles} breakout ${i}`;

        server.channels.create(name,{
                                        type:'voice',
                                        parent:message.channel.parent

                                    })
        // .then(console.log('created room '+name).catch(console.error));
    }
}
moveUsers = (message, rooms, roles) =>{
    message.guild.channels.cache.filter(e => e.type == 'voice' && e.nam)
}

closeBreakout = (message) => {
  console.log('trying to delete');
  let toDelete = message.guild.channels.cache;
  toDelete.filter(e=> e.name.includes('breakout')).forEach(e=> e.delete());
  // console.log(toDelete);
  // toDelete.forEach(e => e.delete());
  //message.guild.channels.filter(e => e.toString().includes('breakout')).forEach(element => element.delete());
}

// experiencing ssl errors, note: ask for some help here
linkAnime = (command) => {
    //https://danbooru.donmai.us/profile.json?login=your_username&api_key=your_api_key
    //https://danbooru.donmai.us/posts/random.json
    let user = 'kyu2999';
    let key = 'LyqicYkUXABvbcjHAjX1YBk6';
    // const fetch = createFetch(
    //     base('https://danbooru.donmai.us/posts/random.json')
    // )
    // fetch()
    
const options = {
  
  method: 'GET',
  port:80,
  path:`profile.json?login=${user}&api+key=${key}/posts/random.json`,
  hostname:'danbooru.donmai.us',
  rejectunauthorized:false
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => { 
    let image = d.file_url;
    message.channel.send(image);
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()


}













client.login('Nzk5ODI1MTMyNDgyNTkyNzkw.YAJNMw.m-GP_DpdQZXaqDL8HxHbgfh6b8Y');
