const playwright = require("playwright")

const playSong = async(songName) => {

    const browser = await playwright.chromium.launch({headless:false});
    const ypage = await browser.newPage()

    await ypage.goto("https://music.youtube.com")
    
    await ypage.click('tp-yt-paper-icon-button[role="button"]')
    await ypage.fill('input[placeholder="Search"]', songName)
    await ypage.keyboard.press('Enter')

    await ypage.waitForLoadState("domcontentloaded")
    await ypage.click('a[class="yt-simple-endpoint style-scope yt-formatted-string"] >> nth=1')
}

playSong("l lag gaye bkchod sangeetkar")