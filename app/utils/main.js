const { startYMusic } = require("./youtube.js");
const { processCommand, exitCmd } = require("./commands.js");
const {
	startBrowser,
	minimizeBrowser,
} = require("./browser.js");
const {
	joinMeet,
	setMeetChatBoxState,
	presentToMeet,
	sendMsgToMeet,
	getMsgsFromMeet,
} = require("./meet.js");

module.exports = async function init(meetLink)
{
	const browser = await startBrowser(channelc='msedge');
	const page1 = await browser.newPage();
	const page2 = await browser.newPage();

	// await minimizeBrowser(browser, page1);

	let ymusic = startYMusic(browser, page1);
	const meet = await joinMeet(browser, page2, meetLink);

	ymusic = await ymusic.then((value) =>
	{
		return value;
	});
	
	await presentToMeet(meet);
	await minimizeBrowser(browser, ymusic);

	// process.on('SIGINT', () => { exitCmd(meet); })

	const pages = {
		ymusic,
		meet,
	};

	// monitor the meet chat for commands, send commands for command processing
	await setMeetChatBoxState(meet, setState = "opened");
	getMsgsFromMeet(meet, processCommand, pages);
};
