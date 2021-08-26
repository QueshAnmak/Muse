const playwright = require("playwright")

const start = async() => {
    
    // open browser
    const browser = await playwright.chromium.launch({
        headless:false,
        devtools: true,
        args: ["--start-maximized"]
    })

    // set browser properties
    const context = await browser.newContext({
        colorScheme: 'dark',
        locale: 'en-US',
    });

    const page = await browser.newPage()

    // open ymusic
    await page.goto("https://music.youtube.com")
    
    // tell everybody bot is on!
    botIsOn = true;
    return page;
}

const playSong = async(page, songName) => {

    // search song
    await page.click('tp-yt-paper-icon-button[role="button"]')
    await page.fill('input[placeholder="Search"]', songName)
    await page.keyboard.press('Enter')
    
    // wait for search results to load
    await page.waitForTimeout(10000)

    // find and click the 1st song in Songs list
    await page.evaluate(`
    var songSelect = null;
    for (var idx = 0; idx < 10; idx++) // change to while loop
    {
        songSelect = document.querySelectorAll('ytmusic-shelf-renderer')[idx].querySelector("h2");
        
        if (songSelect.innerText == "Songs")
            break;
    }

    songSelect.parentElement.children[3].children[0].children[1].children[4].children[1].children[0].click()
    `)
} // to-do: remove evaluate, return details of played song

const pause = async(page) => {

    // if player is playing then pause, else nobody cares
    if (await page.getAttribute('#play-pause-button', 'title') == 'Pause')
    {
        console.log("paused!")
        await page.click("#play-pause-button")
    }
}

const resume = async(page) => {

    // if player is paused then play, else nobody cares
    if (await page.getAttribute('#play-pause-button', 'title') == 'Play')
    {
        console.log("played!")
        await page.click("#play-pause-button")
    }
}

const toggle = async(page) => {

    await page.click("#play-pause-button")
}

async function main() {

    const page = await start()
    await playSong(page, "lmfao")
    await page.waitForTimeout(10000)
    await pause(page)
    await page.waitForTimeout(10000)
    await resume(page)
    await page.waitForTimeout(10000)
    await toggle(page)
}

main()