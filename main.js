const { startBrowser } = require("./browser");
const { googleSignIn } = require("./login");
const {
	joinMeet,
	setMeetChatBoxState,
	presentToMeet,
	getMsgsFromMeet,
} = require("./meet");
const { startYMusic } = require("./youtube");
const { processCommand } = require("./commands");

(async () => {
	// start browser
	const browser = await startBrowser();

	// confirm bot is signed in, if not then sign in
	// await googleSignIn(browser, 'therealmeetbot', 'playthatfunkymusicwhiteboy')

	// open ytmusic, open meet, cast ytmusic to meet
	const meetLink = "https://meet.google.com/vxh-feae-wtt"; // for now take input
	const ymusic = await startYMusic(browser);
	const meet = await joinMeet(browser, meetLink);
	await presentToMeet(meet, (spotlight = false));
	await setMeetChatBoxState(meet);

	const pages = {
		ymusic,
		meet,
	};

	// monitor the meet chat for commands, send commands for command processing
	await getMsgsFromMeet(meet, processCommand, pages); // improvement required
})();
