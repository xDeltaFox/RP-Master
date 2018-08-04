const http = require('http')
const port = 0

let rpc;

function crunchyroll(Discord) {
    if (!rpc) rpc = Discord('452275673537576966');

    http.createServer((request, response) => {
            console.log(request.url);
            var data = JSON.parse('{"' + decodeURI(request.url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')["/?data"]
            console.log(data);
            if (data !== "closed_tab") {
                rpc.updatePresence({
                    details: data,
                    largeImageKey: 'Crunchyroll',
                    instance: true
                });
            } else {
                rpc.updatePresence({
                    details: "Nada a se exibir",
                    largeImageKey: 'Crunchyroll',
                    instance: true
                });
            }
        })
        .listen(port, (err) => {
            if (err) return console.log('Something bad happened', err)

            console.log(`Server is listening on ${port}`)
        });
}

module.exports = crunchyroll;