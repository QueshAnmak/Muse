/**
 * Join a google meet in the browser.
 * 
 * **Fake default audio output device is not working, must switch to Fake audio output 1 or 2 until fixed.**
 
 * **References: 
 *	https://peter.sh/experiments/chromium-command-line-switches/#use-fake-device-for-media-stream**
 * @param {} browser - playwright.BrowserContext
 * @param {string} meetLink
 * @returns
 */
async function joinMeet(browser, page=null, meetLink, presentOnly = false)
{
	// open google meet
	const meet = (page === undefined) ? await browser.newPage() : page;
	
	await meet.evaluate((meetLink) => { console.log(meetLink); }, meetLink);
	await meet.goto(meetLink);

	// console.log("Opened google meet.");

	// dismiss popup - DEPRECATED
	// await meet.click('#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.vdySc.Up8vH.J9Nfi.iWO5td > div.XfpsVe.J9fJmf > div');

	// join meeting, will wait indefinitely
	if (presentOnly)
	{
		await meet.click('div[jsname = "hNGZQc"]', { timeout: 0 });
	}

	else
	{
		// join meeting, will wait indefinitely
		await meet.click('div[jsname="Qx7uuf"]', { timeout: 0 });

		// turn off mic and video
		await meet.keyboard.press('Control+D');
		await meet.keyboard.press('Control+E');

		// // console.log("Turned mic and camera off.");
	}

	// wait for meet to load
	const meetLoadIndicator = await meet.waitForSelector(
		'.SQHmX',
		{
			state: 'attached',
			timeout: 0
		});

	// if popup appears, it hides everything else
	if (meetLoadIndicator.isHidden())
	{
		// in this case, the popup is for for share now, someone else is presenting
		if (presentOnly)
			await meet.click('div[data-id = "EBS5u"]');

		// in this case there is something else wrong - EXPIRED
		try
		{
			await meet.click(
				'#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.vdySc.pMgRYb.Up8vH.J9Nfi.iWO5td > div.XfpsVe.J9fJmf > div',
				{ timeout: 3000 }
			);
		}
		catch (e) { }
	}

	await meet.waitForSelector(".SQHmX");

	// make sure screen is presented
	if (presentOnly)
	{
		await meet.waitForSelector("text=You're presenting to everyone");
	}

	// console.log("Joined meeting.");
	return meet;
}

/**
 * Companion function for joinMeet.
 * @param {} meet 
 */
// async function switchToFakeAudioOutput1(meet)
// {
// 	await meet.click('[aria-label="More options"]');
// 	await meet.click('[jsname="dq27Te"]');
// 	await meet.waitForSelector('text=Speakers');
// 	console.log('0')

// 	// await meet.click('#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.zN0eDd.Kdui9b.vDc8Ic.hFEqNb.J9Nfi.iWO5td > span > div > div.F1dYic.HQRfgd > div.n1etMc.gMPiLc > div.ejeiye > div > div:nth-child(1) > div > div:nth-child(2) > div.nBky5e > div > div.arczj > div > div:nth-child(1) > div.ry3kXd > div.MocG8c.LMgvRb.KKjvXb')
// 	// console.log('1')
// 	await meet.click('[data-aria-label="Select speakers"]');
// 	console.log('2')

// 	await meet.click('text=Fake Audio Output 1');
// 	await meet.click('[aria-label="Close"]');
// } - EXPIRED: Currently not required

/**
 * Changes the state of the meet chatbox to the setState.
 * @param {*} meet
 * @param {'opened'|'closed'|'toggled'} setState
 * @returns
 */
async function setMeetChatBoxState(meet, setState = "opened")
{

	const VALID_STATES = ["opened", "closed", "toggled"];
	let result;

	// check setState is valid
	if (!VALID_STATES.includes(setState)) result = "Invalid setState!!!";

	// get chatBox element
	const chatBox = await meet.$('button[aria-label="Chat with everyone"]');

	// get current state of chatBox
	const curStateBoolean = await chatBox.getAttribute("aria-pressed");

	let curState;
	if (curStateBoolean === true)
		curState = 'opened';
	else
		curState = 'closed';

	// bring chatBox to setState
	if (curState === setState)
	{
		result = `Chatbox already ${setState}.`;
	} else
	{
		await chatBox.click();
		result = `${setState.charAt(0).toUpperCase() + setState.slice(1)
			} the chatbox.`;
	}

	// console.log(result);
	return result;
}

/**
 * Present (screen share) to meet.
 * - ⚠️ The source to be presented must be mentioned in the browser argument "--auto-select-desktop-capture-source=<source>".
 * @param {*} meet
 * @param {boolean} spolight - if set to false, presentation will not be spotlighted.
 * @param {boolean} audio - if set false, presentaion audio will be turned off.
 */
async function presentToMeet(meet, audio = true)
{
	// present tab to meet, whatever it takes
	await forcePresentToMeet(meet);

	// open participants list
	await meet.click('[aria-label="Show everyone"]');
	await meet.waitForSelector('[aria-label="Participants"]');
	const peopleList = meet.locator('[aria-label="Participants"]');

	// permanently pin, by upin and pin.
	await peopleList.click('[aria-label="Unpin your presentation from your main screen."]');
	await meet.waitForTimeout({ timeout: 500 })
	await peopleList.click('[aria-label="Pin your presentation to your main screen."]');

	// console.log("Checking audio.");
	// if ((audio === true))
	// {
	// 	let result = await setPresentationAudioState(meet, (setState = "on"));
	// 	console.log(result);
	// }

	// console.log("Presenting Youtube Music tab.");
} // headless mode not working, fix if possible

async function forcePresentToMeet(meet)
{
	const isItShowtime = await meet.evaluate(async () =>
	{
		const presentButton = document
			.querySelector(".cZG6je")
			.querySelector('[aria-haspopup="menu"]');

		presentButton.click();

		// check if someone else is presenting, cuz then share now popup will appear
		if (
			document
				.querySelector(".cZG6je")
				.querySelector('[aria-haspopup="menu"]')
				.getAttribute("aria-label") !== "Present now"
		)
		{
			// // console.log(
			// document
			// 	.querySelector(".cZG6je")
			// 	.querySelector('[aria-haspopup="menu"]')
			// 	.getAttribute("aria-label");
			// // );
			return "Hell yeah!!!";
		}
	});

	await meet.click(
		'li[role="menuitem"]:has-text("A tabBest for video and animation")'
	);

	// if someone else is presenting, then take over as main
	if (isItShowtime === "Hell yeah!!!")
		await meet.click(
			"#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.OFqiSb.Up8vH.Whe8ub.J9Nfi.iWO5td > div.XfpsVe.J9fJmf > div.U26fgb.O0WRkf.oG5Srb.HQ8yf.C0oVfc.kHssdc.HvOprf.M9Bg4d > span > span"
		);

	await meet.bringToFront();
	await meet.waitForSelector("text=You're presenting to everyone");

	return "Mission F****** Accomplished!!!";
}

// cancelled, uses too many resources, will look into mutation observer to unmute.
async function turnSpotlightOff(meet)
{
	const browser = await meet.context();
	const meetLink = await meet.url();
	const dummyMeet = await joinMeet(browser, meetLink, presentOnly = true);

	// spotlight is off
	await dummyMeet.close();



	// Pin the presentation on meet page (pins only on current meet page)
	// console.log(`Turned spotlight off.`);
}

/**
 *
 * @param {*} meet
 * @param {'on'|'off'|'toggle'} setState
 */
async function setPresentationAudioState(meet, setState = "on")
{
	const VALID_STATES = ["on", "off", "toggle"];
	// check setState is valid
	if (!VALID_STATES.includes(setState)) return "Invalid setState!!!";

	await meet.waitForSelector('[aria-label$="ute your presentation"]', { state: 'attached' });

	const audioButton = await meet.locator('[aria-label$="ute your presentation"]');

	const curState =
		(await audioButton.getAttribute("aria-label")) ===
			"Mute your presentation"
			? "on"
			: "off";

	// console.log(await audioButton.getAttribute("aria-label"));

	if (curState === setState)
		return `Presentation audio is already ${setState}.`;

	else
	{
		// await audioButton.evaluate(() => { document.querySelector('[data-allocation-index="0"]').querySelector('[jsname="LgbsSe"]').click(); });
		await meet.evaluate(() => { document.querySelector('[aria-label$="ute your presentation"]').click(); });
		return `Turned presentation audio ${curState === "on" ? "off" : "on"}.`;
	}
}

/**
 * Gets messages from the meet chat box and passes them to msgProcessor function.
 * - msgProcessor must be asynchronous.
 * - any extra arguments to be passed to msgProcessor must be passed as an object.
 * @param {*} meet
 * @param {Function} msgProcessor - funtion to process the msgs. recieves the string msg as argument.
 * @param {object} msgProcessorArgs - any other arguments to be passed to the msgProcessor.
 */
async function getMsgsFromMeet(meet, msgProcessor, msgProcessorArgs)
{

	await meet.waitForSelector('.z38b6[jsname="xySENc"]');
	const divHandle = await meet.$('.z38b6[jsname="xySENc"]');
	let anotherDivHandle;

	const sendForProcessing = async (message) =>
	{
		return await msgProcessor(message, msgProcessorArgs);
	};

	await meet.exposeFunction("sendForProcessing", sendForProcessing);

	// console.log('Listening for commands.');

	await divHandle.evaluate((div) =>
	{
		new MutationObserver(async (mutationsList, observer) =>
		{
			anotherDivHandle = mutationsList[0].addedNodes[0];

			if (anotherDivHandle === undefined) return;
			else if (anotherDivHandle.className === "GDhqjd")
			{
				anotherDivHandle = anotherDivHandle.childNodes[1];
			}

			let message = anotherDivHandle.innerText;

			let result = await sendForProcessing(message);
			// console.log(result);
		}).observe(div, { childList: true, subtree: true });
	});
} // add comments @DhairyaBahl

/**
 * Send a message to the chat in the meet.
 * @param {string} msg
 */
async function sendMsgToMeet(meet, msg)
{
	msg = "(ツ)  " + msg;
	await meet.fill("textarea", msg);
	await meet.keyboard.press("Enter");
}

async function leaveMeet(meet)
{
	await meet.click('[aria-label="Leave call"]');
}

module.exports = {
	joinMeet,
	setMeetChatBoxState,
	presentToMeet,
	getMsgsFromMeet,
	sendMsgToMeet,
	leaveMeet,
};
