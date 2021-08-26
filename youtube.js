const playwright = require("playwright")

const playSong = async(songName) => {

    // open browser
    const browser = await playwright.chromium.launch({headless:false});
    const ypage = await browser.newPage()

    // open ymusic
    await ypage.goto("https://music.youtube.com")
    
    // search song
    await ypage.click('tp-yt-paper-icon-button[role="button"]')
    await ypage.fill('input[placeholder="Search"]', songName)
    await ypage.keyboard.press('Enter')
    
    // wait for search results to load
    await ypage.waitForTimeout(5000)

    // find and click the 1st song in Songs list
    await ypage.evaluate(`
    var songSelect = null;
    for (var idx = 0; idx < 10; idx++) // change to while loop
    {
        songSelect = document.querySelectorAll('ytmusic-shelf-renderer')[idx].querySelector("h2");
        
        if (songSelect.innerText == "Songs")
            break;
    }

    songSelect.parentElement.children[3].children[0].children[1].children[4].children[1].children[0].click()
    `)
}

playSong("l lag gaye bkchod sangeetkar")