const Discord = require('discord.js');
const request = require('request');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', async () => {
    console.log('I am ready!');
    let channel = await client.guilds.get(config.guildID).channels.get(config.channelID)
    connection = await channel.join();
    connection.playArbitraryInput(config.streamURL);
    client.user.setPresence({ game: { name: "SmashFM", type: 0 } });
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix)) return;
    let cmd = message.content.substring(config.prefix.length)
    switch (cmd.toLowerCase()) {
        case 'help':
            request.get({
                url: 'http://api.laut.fm/station/smash/current_song'
            }, function(error, response, body) {
                current_song = JSON.parse(body.toString());
                message.channel.send(`Meddl! Ich spiel **SmashFM**. \nWas ich sonts noch kann? - Joa nichts.`);
            })
            break;
        case 'playing': 
            request.get({
                url: 'http://api.laut.fm/station/smash/current_song'
            }, function(error, response, body) {
                current_song = JSON.parse(body.toString());
                message.channel.send(`${current_song.artist.name} **-** ${current_song.title}`);
            })
            break;
        default:
            break;
    }
});

client.login(config.token);