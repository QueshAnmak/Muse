const playwright = require("playwright")

const startMusic = async() => {
    
    // get extension path
    const adguard = require('path').join(__dirname, 'adguard');
    const disableytmVisibility = require('path').join(__dirname, 'disable-ytm-visibility-api');// not working, fix

    // open browser
    const userDataDir = './session';
    const browser = await playwright.chromium.launchPersistentContext(userDataDir,{
      headless: false,
      args: [
        `--disable-extensions-except=${adguard},${disableytmVisibility}`,
        `--load-extension=${adguard}`,
        `--load-extension=${disableytmVisibility}`// not working, fix
      ]
    });

    console.log('Browser started.')

    // open ymusic
    const ytm = await browser.newPage()
    await ytm.goto("https://music.youtube.com")
    
    console.log('Youtube Music opened.')

    // tell everybody bot is on!
    botIsOn = true;
    return ytm;
} // headless mode not working, fix

const playSong = async(ytm, songName) => {

    console.log(`Attempting to play ${songName}.`)

    // wait for search bar to load, just in case
    await ytm.waitForSelector('tp-yt-paper-icon-button[role="button"]')
    
    console.log('Search button loaded.')

    // focus search bar
    if (await ytm.getAttribute('tp-yt-paper-icon-button[role="button"]', 'title') == "Initiate search")
        await ytm.click('tp-yt-paper-icon-button[title="Initiate search"]')

    console.log('Search bar focused.')

    // seacrh song
    await ytm.fill('input[placeholder="Search"]', songName)
    await ytm.keyboard.press('Enter')
    
    console.log(`Searched for song ${songName}`)

    // wait for search results to load
    await ytm.waitForSelector('text=Top result')

    console.log('Results Loaded')

    // find and click the 1st song in Songs list
    await ytm.evaluate(`
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

const pause = async(ytm) => {

    // if player is playing then pause, else nobody cares
    if (await ytm.getAttribute('#play-pause-button', 'title') == 'Pause')
    {
        await ytm.click("#play-pause-button")
        console.log("paused!")
    }
}

const resume = async(ytm) => {

    // if player is paused then play, else nobody cares
    if (await ytm.getAttribute('#play-pause-button', 'title') == 'Play')
    {
        await ytm.click("#play-pause-button")
        console.log("played!")
    }
}

const toggle = async(ytm) => {

    await ytm.click("#play-pause-button")
    console.log("toggled!")
}

// testing function, to be removed in production
async function main() {

    const ytm = await startMusic()
    await playSong(ytm, "in my place")
    await ytm.waitForTimeout(10000)
    await playSong(ytm, "ink coldplay")
    await ytm.waitForTimeout(10000)
    await playSong(ytm, "darkside")
    await ytm.waitForTimeout(10000)
    await pause(ytm)
    await ytm.waitForTimeout(10000)
    await resume(ytm)
    await ytm.waitForTimeout(10000)
    await toggle(ytm)
}

main()