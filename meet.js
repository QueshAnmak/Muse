const playwright = require('playwright')

const startMeet = async(meetLink) => {

    const userDataDir = './gooogle';
    
    const browser = await playwright.chromium.launchPersistentContext(userDataDir,{
        headless: false,
        permissions: ['notifications', 'microphone', 'camera', 'geolocation'],
        args: [
          `--disable-blink-features, 
          --start-maximized`
        ],
        colorScheme: 'dark',
        storageState: './state.json',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4595.0 Safari/537.36',
        locale: 'en-US',
        timezoneId: 'Asia/Kolkata',
    });
    
    console.log("Browser started.")

    // open google meet
    const meet = await browser.newPage()
    await meet.goto(meetLink)

    console.log("Open google meet.")

    // 'therealmeetbot@gmail.com', 'playthatfunkymusicwhiteboy'

    // sign in

    // await meet.fill('[aria-label="Email or phone"]', 'therealmeetbot@gmail.com')
    // await meet.click('button:has-text("Next")')

    // await meet.fill('[aria-label="Enter your password"]', 'playthatfunkymusicwhiteboy')
    // await meet.click('button:has-text("Next")')

    console.log("Signed in.")

    // turn off mic and video and join meeting
    await meet.click('[aria-label="Turn off microphone (CTRL + D)"]')
    await meet.click('[aria-label="Turn off camera (CTRL + E)"]')
    await meet.click('div[jsname="Qx7uuf"]')
    await meet.click('text=chatchat_bubble')
    await meet.click('[aria-label="Present now"]')
    
    await browser.storageState({ path: './state.json' });
}

async function main() {

    const meet = startMeet("https://meet.google.com/cnb-fvxd-rik")
}

main()