const playwright = require("playwright")

const playSong = async(songName) => {

    const browser = await playwright.firefox.launch({headless:false});
    const ypage = await browser.newPage()

    await ypage.goto("https://music.youtube.com")
    
    await ypage.click('tp-yt-paper-icon-button[role="button"]')
    await ypage.fill('input[placeholder="Search"]', songName)
    await ypage.keyboard.press('Enter')
    await ypage.waitForTimeout(5000)
    await ypage.click('ytmusic-shelf-renderer > #contents > ytmusic-responsive-list-item-renderer > .flex-columns.style-scope.ytmusic-responsive-list-item-renderer > .title-column.style-scope.ytmusic-responsive-list-item-renderer > yt-formatted-string > a')
}

playSong("l lag gaye bkchod sangeetkar")