const playwright = require('playwright');

async function startBrowser() {

    const userDataDir = './session';

	// extension to remove ads
	const adguard = require('path').join(__dirname, 'adguard');

    const browser = await playwright.chromium.launchPersistentContext(userDataDir,{
        headless: false,
        channel: 'msedge',
        permissions: ['camera','microphone',],
        ignoreDefaultArgs: [
            '--disable-component-extensions-with-background-pages',
        ],
        args: [
			`--disable-extensions-except=${adguard}`,
			`--load-extension=${adguard}`,
            '--auto-select-desktop-capture-source=YouTube'
        ],
        colorScheme: 'dark',
        viewport: null,
        storageState: './state.json',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4595.0 Safari/537.36',
        locale: 'en-US',
        timezoneId: 'Asia/Kolkata',
    });
    
    await browser.storageState({ path: './state.json' });
    
    console.log("Browser started.")

    return browser
}

module.exports = {
	startBrowser
}