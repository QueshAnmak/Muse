const {processCommand} = require('./commands')

async function startMeet(browser, meetLink) {

    // open google meet
    const meet = await browser.newPage()
    await meet.goto(meetLink)

    console.log("Opened google meet.")

    // turn off mic and video
    await meet.click('[aria-label="Turn off microphone (CTRL + D)"]')
    await meet.click('[aria-label="Turn off camera (CTRL + E)"]')

    console.log('Turned mic and camera off.')

    // join meeting
    await meet.click('div[jsname="Qx7uuf"]')

    console.log('Joined meeting.')

    // open chat box
    await meet.click('text=chatchat_bubble')

    console.log('Opened chat box.')

    // present youtube music tab
    await meet.click('[aria-label="Present now"]')
    await meet.click('li[role="menuitem"]:has-text("A tabBest for video and animation")')

    console.log('Presenting Youtube Music tab.')
    
    return meet
}

async function monitorMeetChat(meet, ymusic) {

    const divHandle = await meet.$('.z38b6[jsname="xySENc"]')
    let anotherDivHandle ;

	const sendForProcessing = async (message) => {
		return await processCommand(message, ymusic)
	}

	// await meet.exposeFunction('processCommand', processCommand)
	await meet.exposeFunction('sendForProcessing', sendForProcessing)

    await divHandle.evaluate(div => {
		
		new MutationObserver(async (mutationsList, observer) => {

			anotherDivHandle = mutationsList[0].addedNodes[0]
			
			if (anotherDivHandle === undefined) return;

			else if(anotherDivHandle.className === 'GDhqjd'){
				anotherDivHandle = anotherDivHandle.childNodes[1]
			}

			let message = anotherDivHandle.innerText

			// const ymusic = await getYmusic()
			let result = await sendForProcessing(message);
			console.log(result);

      	}).observe(div, { childList: true, subtree: true });
    });
} // add comments @DhairyaBahl

module.exports = {
    startMeet,
    monitorMeetChat,
}
