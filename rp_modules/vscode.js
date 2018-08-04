var processWindows = require("node-process-windows");

let rpc, activity, previousTitle;

function update(Discord) {
    if (!rpc) rpc = Discord('383226320970055681');

    processWindows.getProcesses((err, processes) => {
        if (err) console.log(err);
        var CodeProcesses = processes.filter(p => p.processName.indexOf("Code") >= 0 || p.processName.indexOf("Code - Insiders") >= 0);

        if (CodeProcesses.length > 0) {
            CodeProcesses.forEach((p) => {
                if (p.mainWindowTitle.length != 0) {
                    var title = p.mainWindowTitle.split(' - '),
                        langkey = title[0].split('.')[1],
                        previousTimestamp = null;

                    if (activity) previousTimestamp = activity['startTimestamp'];
                    if (previousTitle != title[0]) {
                        previousTimestamp = null;
                        previousTitle = title[0];
                    }
                    activity = {
                        details: langkey ? `Editing ${previousTitle}` : "idling",
                        state: langkey ? `Workspace: ${title[1]}` : "idling",
                        startTimestamp: previousTimestamp ? previousTimestamp : new Date().getTime() / 1000,
                        largeImageKey: langkey ? langkey : 'vscode-big',
                        smallImageKey: title.includes('Insiders') ? 'vscode-insiders' : 'vscode',
                        largeImageText: langkey ? `Editing a ${langkey.toUpperCase()} file` : "idling",
                        smallImageText: title.includes('Insiders') ? 'Visual Studio Code Insiders' : 'Visual Studio Code',
                        instance: false
                    }
                    if (!langkey) {
                        delete activity.startTimestamp
                    }
                    rpc.updatePresence(activity);
                }
            });
        }
    });
}

module.exports = update;