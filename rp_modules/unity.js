var processWindows = require("node-process-windows");

let rpc, activity, previousTitle;

function update(Discord) {
    if (!rpc) rpc = Discord('385523660301271040');

    processWindows.getProcesses((err, processes) => {
        if (err) console.log(err);
        var UnityProcesses = processes.filter(p => p.processName.indexOf("Unity") >= 0);

        if (UnityProcesses.length > 0) {
            UnityProcesses.forEach((p) => {
                if (p.mainWindowTitle.length != 0) {
                    var title = p.mainWindowTitle.split(' - '),
                        DX = title[3].split(/</g)[1].replace('>', ''),
                        previousTimestamp = null;

                    if (activity) previousTimestamp = activity['startTimestamp'];
                    if (previousTitle != title[1]) {
                        previousTimestamp = null;
                        previousTitle = title[1];
                    }
                    activity = {
                        details: `Scene: ${previousTitle}`,
                        state: `Project: ${title[2]} <${DX}>`,
                        startTimestamp: previousTimestamp ? previousTimestamp : new Date().getTime() / 1000,
                        largeImageKey: 'unity_logo',
                        instance: false
                    }
                    rpc.updatePresence(activity);
                }
            });
        }
    });
}

module.exports = update;