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
    }
    else if (command === 'test'){
      testing(message);
    }
    else if (command === 'distribute'){
      distributeUsers(message);
    }
    else if (command === 'anime'){
        linkAnime(command);
    }
    else if (command === 'close'){
      closeBreakout(message);
    }
})
testing = (message) =>{
  //get channels in a guild, filter to voice channels
  // let chan = message.guild.channels.cache;
  // console.log(Object.getOwnPropertyNames(chan));
  // console.log(chan._array);
  // console.log(chan._keyArray);
  // let filtered = chan.filter(e => e instanceof Discord.VoiceChannel);
  // console.log(filtered);
  

  //how to get members in guild, get roles from members. cant figure out how to get connections to show up
  // probably need to use fetch to get active connections. fetch returns a promise though
  // let memArray = [];
  // message.guild.members.cache.forEach(mem => memArray.push(mem));
  // console.log(Object.getOwnPropertyNames(memArray[0]));
  // console.log(memArray[0].user.username);
  // console.log(memArray[0]._roles);
  // console.log(memArray[0].client);
  // console.log(memArray[0].client.voice);
  

  //getRole()
  //console.log(message.guild.roles.cache);
  // message.guild.roles.cache.forEach(e => console.log(e.name));
  // let map =  message.guild.roles.cache.filter(e=>e.name === 'testrole');
  // ///console.log(map);
  // let arr = [];
  // map.forEach(e=>arr.push(e));
  // //console.log(arr);
  // let role = arr[0];
  // console.log(role);
  // console.log(`role name: ${role.name}, \n role id: ${role.id}`);
  let guild = message.guild;
  let role = getRole(guild, 'testrole');
  let memArr = getMembersWithRole(guild,role);
  let activeMem = guild.members.fetch().then(mems => mems);
  console.log(activeMem);

  

  
}
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
distributeUsers=(message)=> {
  message.author;
}
closeBreakout = (message) => {
  console.log('trying to delete');
  let toDelete = message.guild.channels.cache;
  toDelete.filter(e=> e.name.includes('breakout')).forEach(e=> e.delete());
  // console.log(toDelete);
  // toDelete.forEach(e => e.delete());
  //message.guild.channels.filter(e => e.toString().includes('breakout')).forEach(element => element.delete());
}
// returns role 
function getRole(guild, roleName){

  let map =  guild.roles.cache.filter(e=>e.name === roleName);
  ///console.log(map);
  let arr = [];
  map.forEach(e=>arr.push(e));
  //console.log(arr);
  let role = arr[0];
  return role;
}
//returns type GuildMember[]
function getMembersWithRole(guild,role){

  console.log(role.id+'');
  guild.members.cache.forEach(guildMem => console.log(guildMem._roles));
  let memArr = guild.members.cache.filter(guildMem => guildMem._roles.includes(role+'')).map(x => x);
  return memArr;
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
