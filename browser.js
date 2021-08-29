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
            '--auto-select-desktop-capture-source=Youtube'
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

async function googleSignIn(browser, email, password) {
    
    // go to sign in page
	const signInPage = await browser.newPage()
    await signInPage.goto('https://accounts.google.com/signin/v2/identifier?hl=ja&flowName=GlifWebSignIn&flowEntry=ServiceLogin')

    console.log("Going to sign in page.")

    // fill details
    await signInPage.fill('[aria-label="Email or phone"]', email)
    await signInPage.click('button:has-text("Next")')
    await signInPage.fill('[aria-label="Enter your password"]', password)
    await signInPage.click('button:has-text("Next")')

    console.log("Signed In.")

	await signInPage.close()
}

module.exports = {
	startBrowser
}