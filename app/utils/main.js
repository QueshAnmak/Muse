const { googleSignIn } = require("./login.js");
const { startYMusic } = require("./youtube.js");
const { processCommand } = require("./commands.js");
const {
	startBrowser,
	minimizeBrowser,
} = require("./browser.js");
const {
	joinMeet,
	setMeetChatBoxState,
	presentToMeet,
	getMsgsFromMeet,
} = require("./meet.js");

module.exports = async function init(meetLink, spotlight=false)
{
	const browser = await startBrowser();

	const ymusic = await startYMusic(browser, meetLink);
	const meet = await joinMeet(browser, meetLink);
	await presentToMeet(meet, (spotlight));
	await minimizeBrowser(browser, meet)
	await setMeetChatBoxState(meet);

	const pages = {
		ymusic,
		meet,
	};

	// monitor the meet chat for commands, send commands for command processing
	await getMsgsFromMeet(meet, processCommand, pages);
};
