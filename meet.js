/**
 * Join a google meet in the browser.
 * @param {} browser - playwright.BrowserContext
 * @param {string} meetLink
 * @returns
 */
async function startMeet(browser, meetLink) {
	// open google meet
	const meet = await browser.newPage();
	await meet.goto(meetLink);

	console.log("Opened google meet.");

	// turn off mic and video
	await meet.click('[aria-label="Turn off microphone (CTRL + D)"]');
	await meet.click('[aria-label="Turn off camera (CTRL + E)"]');

	console.log("Turned mic and camera off.");

	// join meeting, will wait indefinitely
	await meet.click('div[jsname="Qx7uuf"]', { timeout: 0 });

	console.log("Joined meeting.");

	// open chat box
	await meet.click("text=chatchat_bubble");

	console.log("Opened chat box.");

	await presentTabInMeet(meet);

	return meet;
}

/**
 * Present the tab mentioned in browser launch arguments.
 */
async function presentTabInMeet(meet) {
	await meet.evaluate(async () => {
		document
			.querySelector(".cZG6je")
			.children[3].children[0].children[1].children[0].children[0].children[0].click();
	});
	await meet.click(
		'li[role="menuitem"]:has-text("A tabBest for video and animation")'
	);

	console.log("Presenting Youtube Music tab.");
}

/**
 * Observe the meet chat for any messages.
 * Upon recieving a message send it to processCommand.
 * @param {} meet - playwright.BrowserContext
 * @param {} ymusic - playwright.BrowserContext
 */
async function getMsgsFromMeet(meet, pages, processCommand) {
	const divHandle = await meet.$('.z38b6[jsname="xySENc"]');
	let anotherDivHandle;

	const sendForProcessing = async (message) => {
		return await processCommand(message, pages);
	};

	// await meet.exposeFunction('processCommand', processCommand)
	await meet.exposeFunction("sendForProcessing", sendForProcessing);

	await divHandle.evaluate((div) => {
		new MutationObserver(async (mutationsList, observer) => {
			anotherDivHandle = mutationsList[0].addedNodes[0];

			if (anotherDivHandle === undefined) return;
			else if (anotherDivHandle.className === "GDhqjd") {
				anotherDivHandle = anotherDivHandle.childNodes[1];
			}

			let message = anotherDivHandle.innerText;

			// const ymusic = await getYmusic()
			let result = await sendForProcessing(message);
			console.log(result);
		}).observe(div, { childList: true, subtree: true });
	});
} // add comments @DhairyaBahl

/**
 * Send a message to the chat in the meet.
 * @param {string} msg
 */
async function sendMsgToMeet(meet, msg) {
	msg = "(ツ)  " + msg;
	await meet.fill("textarea", msg);
	await meet.keyboard.press("Enter");
}

module.exports = {
	startMeet,
	presentTabInMeet,
	getMsgsFromMeet,
	sendMsgToMeet,
};
