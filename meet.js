const playwright = require('playwright')

const startMeet = async(meetLink) => {

    const browser = await playwright.chromium.launch({
        headless: false,
        channel: 'msedge',
    })

    console.log("Browser started.")

    // open google meet
    const meet = await browser.newPage()
    await meet.goto(meetLink)

    console.log("Open google meet.")
    // 'therealmeetbot@gmail.com', 'playthatfunkymusicwhiteboy'

    // sign in
    await meet.fill('[aria-label="Email or phone"]', 'therealmeetbot@gmail.com')
    await meet.click('button:has-text("Next")')

    await meet.fill('[aria-label="Enter your password"]', 'playthatfunkymusicwhiteboy')
    await meet.click('button:has-text("Next")')

    console.log("Signed in.")

    // turn off mic and video and join meeting
    await meet.click('[aria-label="Turn off microphone (CTRL + D)"]')
    await meet.click('[aria-label="Turn off camera (CTRL + E)"]')
    await meet.click('div[jsname="Qx7uuf"]')
    await meet.click('text=chatchat_bubble')
    await meet.click('[aria-label="Present now"]')
}

async function main() {

    const meet = startMeet("https://meet.google.com/roj-hstc-wyi")
}

main()