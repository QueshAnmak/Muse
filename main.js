const {startBrowser, googleSignIn} = require('./browser')
const {startMeet} = require('./meet')

async function main() {

    const browser = await startBrowser()
    await googleSignIn(browser, 'therealmeetbot@gmail.com', 'playthatfunkymusicwhiteboy')
    const meetLink = "https://meet.google.com/fox-xdrt-nhs"
    const meet = await startMeet(browser, meetLink)
}

main()