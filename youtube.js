async function startYMusic(browser) {

    // open ymusic
    const ymusic = await browser.newPage()
    await ymusic.goto("https://music.youtube.com")
    
    console.log('Youtube Music opened.')
    return ymusic;
} // headless mode not working, fix

async function playSong(ymusic, songName) {

    console.log(`Attempting to play ${songName}.`)

    // wait for search bar to load, just in case
    await ymusic.waitForSelector('tp-yt-paper-icon-button[role="button"]')
    
    console.log('Search button loaded.')

    // focus search bar
    if (await ymusic.getAttribute('tp-yt-paper-icon-button[role="button"]', 'title') == "Initiate search")
        await ymusic.click('tp-yt-paper-icon-button[title="Initiate search"]')

    console.log('Search bar focused.')

    // seacrh song
    await ymusic.fill('input[placeholder="Search"]', songName)
    await ymusic.keyboard.press('Enter')
    
    console.log(`Searched for song ${songName}`)

    // wait for search results to load
    await ymusic.waitForSelector('text=Top result')

    console.log('Results Loaded')

    // find and click the 1st song in Songs list
    await ymusic.evaluate(`
    var songSelect = null;
    for (var idx = 0; idx < 10; idx++) // change to while loop
    {
        songSelect = document.querySelectorAll('ymusicusic-shelf-renderer')[idx].querySelector("h2");
        
        if (songSelect.innerText == "Songs")
            break;
    }

    songSelect.parentElement.children[3].children[0].children[1].children[4].children[1].children[0].click()
    `)

    console.log(`Now Playing - ${songName}`)
} // to-do: remove evaluate, return details of played song

async function pause(ymusic) {

    // if player is playing then pause, else nobody cares
    if (await ymusic.getAttribute('#play-pause-button', 'title') == 'Pause')
    {
        await ymusic.click("#play-pause-button")
        console.log("paused!")
    }
}

async function resume(ymusic) {

    // if player is paused then play, else nobody cares
    if (await ymusic.getAttribute('#play-pause-button', 'title') == 'Play')
    {
        await ymusic.click("#play-pause-button")
        console.log("played!")
    }
}

async function toggle(ymusic) {

    await ymusic.click("#play-pause-button")
    console.log("toggled!")
}

// testing function, to be removed in production
async function main() {

    const ymusic = await startMusic()
    await playSong(ymusic, "in my place")
    await ymusic.waitForTimeout(10000)
    await playSong(ymusic, "ink coldplay")
    await ymusic.waitForTimeout(10000)
    await playSong(ymusic, "darkside")
    await ymusic.waitForTimeout(10000)
    await pause(ymusic)
    await ymusic.waitForTimeout(10000)
    await resume(ymusic)
    await ymusic.waitForTimeout(10000)
    await toggle(ymusic)
}

main()