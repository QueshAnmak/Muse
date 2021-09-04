const { chromium } = require("playwright");

async function startBrowser()
{
	const browser = await chromium.launch(
		{
			headless: false,
			channel: "msedge",
			ignoreDefaultArgs: [
				"--disable-component-extensions-with-background-pages",
			],
			args: ["--auto-select-desktop-capture-source=YouTube"],
		});

	const browserContext = browser.newContext(
		{
			colorScheme: "dark",
			viewport: null,
			permissions: [], //["camera", "microphone"],
			storageState: "./auth.json",
			userAgent:
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4595.0 Safari/537.36",
			locale: "en-US",
			timezoneId: "Asia/Kolkata",
		});

	console.log("Browser started.");
	return browserContext;
}

async function closeBrowser(browser)
{
	console.log("Closing Browser.");
	await browser.close();
}

module.exports = {
	startBrowser,
	closeBrowser,
};
