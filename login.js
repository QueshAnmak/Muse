async function googleSignIn(browser, email, password) {
	// go to sign in page
	const signInPage = await browser.newPage();
	await signInPage.goto(
		"https://accounts.google.com/signin/v2/identifier?hl=ja&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
	);

	console.log("Going to sign in page.");

	// fill details
	await signInPage.fill('[aria-label="Email or phone"]', email);
	await signInPage.click('button:has-text("Next")');
	await signInPage.fill('[aria-label="Enter your password"]', password);
	await signInPage.click('button:has-text("Next")');

	console.log("Signed In.");

	await signInPage.close();
}

module.exports = {
	googleSignIn,
};
