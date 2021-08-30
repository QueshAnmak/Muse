const { startBrowser } = require('./browser');
const { googleSignIn } = require('./login');
const { startMeet, monitorMeetChat } = require('./meet');
const { startYMusic } = require('./youtube');

(async () => {
	// start browser
    const browser = await startBrowser()

	// confirm bot is signed in, if not then sign in
	// await googleSignIn(browser, 'therealmeetbot', 'playthatfunkymusicwhiteboy')

	// open ytmusic, open meet, cast ytmusic to meet
    const meetLink = "https://meet.google.com/wti-ctsz-djp" // for now take input
    const ymusic = await startYMusic(browser)
    const meet = await startMeet(browser, meetLink);
    
    // Monitor the meet chat for commands, send commands for command processing 
	await monitorMeetChat(meet, ymusic) // improvement required
	

})();