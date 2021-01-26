// jshint esversion: 6

// returns role
const Discord = require('discord.js');
const getRole = (guild, roleName) => {

	const map = guild.roles.cache.filter(e => e.name === roleName);
	// /console.log(map);
	const arr = [];
	map.forEach(e => arr.push(e));
	// console.log(arr);
	const role = arr[0];
	return role;
};
exports.getRole = getRole;
// returns type GuildMember[]
const getMembersWithRole = (guild, role) => {
	let memArr = [];
	// console.log('-----starting helper method getMembersWithRole-----');
	// console.log('searching for role id :' + role.id);
	// guild.members.cache.forEach(guildMem => console.log(guildMem.user.username + ' has the roles: ' + guildMem._roles));
	memArr = guild.members.cache.filter(guildMem => guildMem._roles.includes(role + ''));
	// console.log(memArr);
	// console.log('--------------- end helper ---------------');

	return memArr;
};
exports.getMembersWithRole = getMembersWithRole;
// working
const moveMember = (member, channel) => {
	// unsupported
	if (member.voice.channel) {
		member.voice.setChannel(channel);
	}
	else { console.log('user not connected to voice'); }
};
exports.moveMember = moveMember;
// returns voice channels
const getVoiceChannels = (message) => {
	// get channels in a guild, filter to voice channels
	const chan = message.guild.channels.cache;
	// console.log(Object.getOwnPropertyNames(chan));
	// console.log(chan._array);
	// console.log(chan._keyArray);
	const filtered = chan.filter(e => e instanceof Discord.VoiceChannel);
	// console.log(filtered);
	return filtered;
};
exports.getVoiceChannels = getVoiceChannels;