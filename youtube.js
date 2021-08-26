const playwright = require("playwright")

const startMusic = async() => {
    
    // get extension path
    const adguard = require('path').join(__dirname, 'adguard');
    const disablePageVisibility = require('path').join(__dirname, 'disable-page-visibility-api');// not working, fix

    // open browser
    const userDataDir = './session';
    const browser = await playwright.chromium.launchPersistentContext(userDataDir,{
      headless: true,
      args: [
        `--disable-extensions-except=${adguard},${disablePageVisibility}`,
        `--load-extension=${adguard}`,
        `--load-extension=${disablePageVisibility}`// not working, fix
      ]
    });

    console.log('Browser started.')

    // open ymusic
    const page = await browser.newPage()
    await page.goto("https://music.youtube.com")
    
    console.log('Youtube Music opened.')

    // tell everybody bot is on!
    botIsOn = true;
    return page;
} // headless mode not working, fix

const playSong = async(page, songName) => {

    console.log(`Attempting to play ${songName}.`)

    // wait for search bar to load, just in case
    await page.waitForSelector('tp-yt-paper-icon-button[role="button"]')
    
    console.log('Search button loaded.')

    // focus search bar
    if (await page.getAttribute('tp-yt-paper-icon-button[role="button"]', 'title') == "Initiate search")
        await page.click('tp-yt-paper-icon-button[title="Initiate search"]')

    console.log('Search bar focused.')

    // seacrh song
    await page.fill('input[placeholder="Search"]', songName)
    await page.keyboard.press('Enter')
    
    console.log(`Searched for song ${songName}`)

    // wait for search results to load
    await page.waitForSelector('text=Top result')

    console.log('Results Loaded')

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

    console.log(`Now Playing - ${songName}`)
} // to-do: remove evaluate, return details of played song

const pause = async(page) => {

    // if player is playing then pause, else nobody cares
    if (await page.getAttribute('#play-pause-button', 'title') == 'Pause')
    {
        await page.click("#play-pause-button")
        console.log("paused!")
    }
}

const resume = async(page) => {

    // if player is paused then play, else nobody cares
    if (await page.getAttribute('#play-pause-button', 'title') == 'Play')
    {
        await page.click("#play-pause-button")
        console.log("played!")
    }
}

const toggle = async(page) => {

    await page.click("#play-pause-button")
    console.log("toggled!")
}

// testing function, to be removed in production
async function main() {

    const page = await startMusic()
    await playSong(page, "in my place")
    await page.waitForTimeout(10000)
    await playSong(page, "ink coldplay")
    await page.waitForTimeout(10000)
    await playSong(page, "darkside")
    await page.waitForTimeout(10000)
    await pause(page)
    await page.waitForTimeout(10000)
    await resume(page)
    await page.waitForTimeout(10000)
    await toggle(page)
}

main()