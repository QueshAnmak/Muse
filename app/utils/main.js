const { startBrowser } = require("./browser.js");
const { googleSignIn } = require("./login.js");
const {
	joinMeet,
	setMeetChatBoxState,
	presentToMeet,
	getMsgsFromMeet,
} = require("./meet.js");
const { startYMusic } = require("./youtube.js");
const { processCommand } = require("./commands.js");

module.exports = async function init(meetLink)
{
	const browser = await startBrowser();

	const ymusic = await startYMusic(browser);
	
	const meet = await joinMeet(browser, meetLink);
	await presentToMeet(meet, (spotlight = false));
	await setMeetChatBoxState(meet);

	const pages = {
		ymusic,
		meet,
	};

	// monitor the meet chat for commands, send commands for command processing
	await getMsgsFromMeet(meet, processCommand, pages);
};
