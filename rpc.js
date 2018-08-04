const Discord = require('discord-rich-presence'),
    vlc = require('./rp_modules/vlc'),
    fortnite = require('./rp_modules/fortnite'),
    EU4 = require('./rp_modules/EU4'),
    xbox = require('./rp_modules/xbox'),
    vscode = require('./rp_modules/vscode'),
    unity = require('./rp_modules/unity'),
    crunchyroll = require('./rp_modules/crunchyroll');

console.log("Running...");
console.log(process.argv);

/*if (v == null) {
	console.log(`Missing argument RP:\nUse -RP={id}\n\nRP Supported:\n\nNome               | ID\n--------------------------------\nVLC Media Player   | vlc\nCrunchyroll        | crunchyroll\nXbox               | xbox\nFortnite           | fortnite\nVisual Studio Code | vscode\nUnity Engine       | unity\n`);
	return;
}*/
	
switch (process.argv[2]) {
	case '-vlc':
		vlc(Discord);
		setInterval(() => {
			vlc(Discord);
		}, 1000);
		break;
	case '-crunchyroll':
		crunchyroll(Discord);
		break;
	case '-xbox':
		xbox(Discord);
		setInterval(() => {
			xbox(Discord);
		}, 60000);
		break;
	case '-fortnite':
		fortnite(Discord);
		setInterval(() => {
			fortnite(Discord);
		}, 1000);
		break;
	case '-EU4':
		EU4(Discord);
		setInterval(() => {
			EU4(Discord);
		}, 1000);
		break;
	case '-vscode':
		vscode(Discord);
		setInterval(() => {
			vscode(Discord);
		}, 1000);
		break;
	case '-unity':
		unity(Discord);
		setInterval(() => {
			unity(Discord);
		}, 1000);
		break;
	default:
		break;
}