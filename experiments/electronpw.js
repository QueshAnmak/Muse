const { _electron: electron } = require('playwright');

async function startElectron() {

	const electronApplication = await electron.launch({
		args: [
			'main.js'
		],
		colorScheme: "dark",
		ignoreDefaultArgs: [
			"--disable-component-extensions-with-background-pages",
		],
		locale: "en-US",
		timezoneId: "Asia/Kolkata",
	});

	return electronApplication.context();
}
startElectron()