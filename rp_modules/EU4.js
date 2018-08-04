const fs = require('fs'),
    readline = require('readline'),
    stream = require('stream');

let rpc,
    username = "",
    dateGame = "",
    empire = ""

async function updatediscord(Discord) {
    if (!rpc) rpc = Discord('464177456937566209');
    var instream = fs.createReadStream(require("os").homedir() + "/Documents/Paradox Interactive/Europa Universalis IV/logs/game.log");
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);
    await rl.on('line', function(line) {
        // process line here
        if (line.includes('ingamelobby.cpp:523')) {
            username = line.split(': ')[1].split(' ')[1]
        } else if (line.includes('ingamelobby.cpp:534')) {
            empire = line.split(': ')[2].replace('Local player is ', '');
        } else if (line.includes('messagehandler.cpp:274')) {
            dateGame = line.split(': ')[1].split(' - ')[0]
        }
    });

    rpc.updatePresence({
        details: `${username} as ${empire}`,
        state: `${dateGame}`,
        largeImageKey: 'eu4',
        largeImageText: `Europa Universalis IV`,
        instance: false
    });
}

module.exports = updatediscord;