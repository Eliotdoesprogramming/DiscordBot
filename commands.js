//jshint esversion: 6
const HelperModule = require('./helpers.js');
const Discord = require('discord.js');

var testing = (message) => {
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

    // checking if a user is connected to a channel
    // let role = HelperModule.getRole(message.guild, 'testrole');
    // let memWithRole = HelperModule.getMembersWithRole(message.guild, role);
    // // console.log(memWithRole[0].user.username + ' has the role');
    // // console.log(memWithRole[0].voice.channel);
    // //console.log(memWithRole[0].user.username + ' is connected to ' + memWithRole[0].voice.channel.name);

    // let breakouts = message.guild.channels.cache.filter(e => e.name.includes('breakout'));
    // breakouts.forEach(e => console.log(e.name));
    // let breakoutArr = [];
    // breakouts.forEach(e => breakoutArr.push(e));

    //going to get a working distribute and then paste it

};
exports.testing = testing;
var createRoom = (message, rooms, roles) => {
    let server = message.guild;

    for (let i = 1; i <= rooms; i++) {
        let name = `${roles} breakout ${i}`;

        server.channels.create(name, {
            type: 'voice',
            parent: message.channel.parent

        });
        // .then(console.log('created room '+name).catch(console.error));
    }
};
exports.createRoom = createRoom;
//!dist [role] distributes connected users to breakout rooms in a random ordering
var distributeToBreakout = (message) => {
    let msgtext = message.content.slice(1);
    let args = msgtext.split(' ');
    args.shift();
    let arg1 = args.shift();
    let role = HelperModule.getRole(message.guild, arg1);
    let membersWithRole = HelperModule.getMembersWithRole(message.guild, role);
    let connectedMembersWithRole = [];
    membersWithRole.filter(e => e.voice.channel).forEach(e => connectedMembersWithRole.push(e));
    console.log(connectedMembersWithRole + ' are members with the role');

    let breakoutArr = [];
    HelperModule.getVoiceChannels(message).filter(e => e.name.includes('breakout')).forEach(e => breakoutArr.push(e));
    console.log(breakoutArr + ' are voice channels named breakout');
    breakoutArr = shuffle(breakoutArr);
    let j = 0;
    for (let i = 0; i < connectedMembersWithRole.length; j++, i++) {

        HelperModule.moveMember(connectedMembersWithRole[i], breakoutArr[j]);
        if (j == breakoutArr.length - 1) j = -1;
    }
};
exports.distributeToBreakout = distributeToBreakout;
var closeBreakout = (message) => {
    console.log('trying to delete');
    let toDelete = message.guild.channels.cache;
    toDelete.filter(e => e.name.includes('breakout')).forEach(e => e.delete());

};
exports.closeBreakout = closeBreakout;
// experiencing ssl errors, note: ask for some help here
exports.linkAnime = (command) => {
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
        port: 80,
        path: `profile.json?login=${user}&api+key=${key}/posts/random.json`,
        hostname: 'danbooru.donmai.us',
        rejectunauthorized: false
    };

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);

        res.on('data', d => {
            let image = d.file_url;
            message.channel.send(image);
        });
    });

    req.on('error', error => {
        console.error(error);
    });

    req.end();


};

let shuffle = (array) => {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};