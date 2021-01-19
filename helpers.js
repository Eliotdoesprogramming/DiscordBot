//jshint esversion: 6

// returns role 
exports.getRole = (guild, roleName) => {

    let map = guild.roles.cache.filter(e => e.name === roleName);
    ///console.log(map);
    let arr = [];
    map.forEach(e => arr.push(e));
    //console.log(arr);
    let role = arr[0];
    return role;
};
//returns type GuildMember[]
exports.getMembersWithRole = (guild, role) => {

    console.log(role.id + '');
    guild.members.cache.forEach(guildMem => console.log(guildMem._roles));
    let memArr = guild.members.cache.filter(guildMem => guildMem._roles.includes(role + '')).map(x => x);
    return memArr;
};
exports.distributeUsers = (message) => {
    // unsupported
    console.log('unsupported');
};
// returns voice channels
exports.getVoiceChannels = (message) => {
    //get channels in a guild, filter to voice channels
    let chan = message.guild.channels.cache;
    // console.log(Object.getOwnPropertyNames(chan));
    // console.log(chan._array);
    // console.log(chan._keyArray);
    let filtered = chan.filter(e => e instanceof Discord.VoiceChannel);
    // console.log(filtered);
    return filtered;
};