const vlcService = require("droopy-vlc"),
    config = require("../config.js"),
    vlc = new vlcService("http://:" + config.vlcPass + "@" + config.vlcHost + ":" + config.vlcPort);

let rpc;

function tratartexto(text) {
    return text
        .replace(/(&#39;)/g, "'")
        .replace(/(&amp;)/g, "&")
        .replace(/(&lt;)/g, "<")
        .replace(/(&gt;)/g, ">")
        .replace(/(&quot;)/g, '"')
        .replace(/.mp3$/, "")
        .replace(/.mp4$/, "")
        .replace(/.ogg$/, "")
        .replace(/.mkv$/, "")
        .replace(/.m4a$/, "")
}

function update(Discord) {
    if (!rpc) rpc = Discord('462054025270132746');
    vlc.status().then(function(status) {
        let secondline = status.state,
            newPlaying = {
                state: secondline,
                details: tratartexto(status.filename),
                largeImageKey: "vlc",
                smallImageKey: status.state,
                instance: true
            }
        if (status.state === "playing") {
            newPlaying.startTimestamp = Date.now() / 1000
            newPlaying.endTimestamp = parseInt(parseInt(Date.now() / 1000) + (parseInt(status.duration) - parseInt(status.time)))
        }
        rpc.updatePresence(newPlaying);
        delete newPlaying.startTimestamp
        delete newPlaying.endTimestamp
    }, function(error) {
        var newPlaying = {
            state: "Stopped",
            details: "What did you expect this to say?",
            largeImageKey: "vlc",
            smallImageKey: "stopped",
            instance: true
        }
        rpc.updatePresence(newPlaying);
    });
}

module.exports = update;