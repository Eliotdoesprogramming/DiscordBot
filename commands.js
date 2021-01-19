//jshint esversion: 6
const HelperModule = require('./helpers.js');
exports.testing = (message) => {
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
    let role = HelperModule.getRole(guild, 'testrole');
    let memArr = HelperModule.getMembersWithRole(guild, role);
    let activeMem = guild.members.fetch().then(mems => mems);
    console.log(activeMem);




};
exports.createRoom = (message, rooms, roles) => {
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
exports.moveUsers = (message, rooms, roles) => {
    message.guild.channels.cache.filter(e => e.type == 'voice' && e.nam)
};

exports.closeBreakout = (message) => {
    console.log('trying to delete');
    let toDelete = message.guild.channels.cache;
    toDelete.filter(e => e.name.includes('breakout')).forEach(e => e.delete());
    // console.log(toDelete);
    // toDelete.forEach(e => e.delete());
    //message.guild.channels.filter(e => e.toString().includes('breakout')).forEach(element => element.delete());
};
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
    }

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);

        res.on('data', d => {
            let image = d.file_url;
            message.channel.send(image);
        });
    })

    req.on('error', error => {
        console.error(error);
    })

    req.end();


};