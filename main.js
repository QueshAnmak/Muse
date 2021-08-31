const { startBrowser } = require("./browser");
const { googleSignIn } = require("./login");
const { startMeet, presentTabInMeet, getMsgsFromMeet } = require("./meet");
const { startYMusic } = require("./youtube");
const { processCommand } = require("./commands");

(async () => {
	// start browser
	const browser = await startBrowser();

	// confirm bot is signed in, if not then sign in
	// await googleSignIn(browser, 'therealmeetbot', 'playthatfunkymusicwhiteboy')

	// open ytmusic, open meet, cast ytmusic to meet
	const meetLink = "https://meet.google.com/mbb-hnjb-jod"; // for now take input
	const ymusic = await startYMusic(browser);
	const meet = await startMeet(browser, meetLink);

	const pages = {
		ymusic,
		meet,
	};

	// Monitor the meet chat for commands, send commands for command processing
	await getMsgsFromMeet(meet, pages, processCommand); // improvement required
})();
