const { chromium } = require("playwright-core");

async function startBrowser(
	minimized=true,
	channelc='msedge',
	screenShareSource='YouTube',
)
{
	// const pathToExtension = 'C:\\Users\\samriddh jain\\Projects\\meet-bot\\app\\mute-new-tabs';
	const browser = await chromium.launch(
		{
			headless: false,
			channel: channelc,
			ignoreDefaultArgs: [
				"--disable-component-extensions-with-background-pages",
				'--disable-extensions',
				// '--disable-default-apps',
			],
			args: [
				// `--load-extension=${pathToExtension}`,
				`--auto-select-desktop-capture-source=${screenShareSource}`,
				'--enable-tab-audio-muting',
				'--use-fake-ui-for-media-stream',
				// '--mute-audio',

			],

			// logger: {
			// 	isEnabled: (name, severity) => name === 'browser',
			// 	log: (name, severity, message, args) => console.log(`${name} ${message}`)
			// }
		});

	const browserContext = await browser.newContext(
		{
			colorScheme: "dark",
			viewport: null,
			permissions: [], //["camera", "microphone"],
			storageState: "./app/login_data/auth.json",
			userAgent:
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4595.0 Safari/537.36",
			locale: "en-US",
			timezoneId: "Asia/Kolkata",
		});

	// console.log("Browser started.");
	return browserContext;
}

async function minimizeBrowser(browser, page)
{
	// Create raw protocol session.
	const session = await browser.newCDPSession(page);
	const { windowId } = await session.send('Browser.getWindowForTarget');
	await session.send('Browser.setWindowBounds', { windowId, bounds: { windowState: 'minimized' } });
}

async function closeBrowser(browser)
{
	// console.log("Closing Browser.");
	await browser.close();
}

module.exports = {
	startBrowser,
	minimizeBrowser,
	closeBrowser,
};
