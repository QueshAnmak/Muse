async function startMeet(browser, meetLink) {

    // open google meet
    console.log("fuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuck")
    console.log(typeof(browser))
    const meet = await browser.newPage()
    await meet.goto(meetLink)

    console.log("Opened google meet.")

    // turn off mic and video
    await meet.click('[aria-label="Turn off microphone (CTRL + D)"]')
    await meet.click('[aria-label="Turn off camera (CTRL + E)"]')

    console.log('Turned mic and camera off.')

    // join meeting
    await meet.click('div[jsname="Qx7uuf"]')

    console.log('Joined meeting.')

    // open chat box
    await meet.click('text=chatchat_bubble')

    console.log('Opened chat box.')

    // present youtube music tab
    await meet.click('[aria-label="Present now"]')
    await meet.click('li[role="menuitem"]:has-text("A tabBest for video and animation")')

    console.log('Presenting Youtube Music tab.')
    
    return meet
}

// async function main() {

//     const meet = startMeet("https://meet.google.com/fox-xdrt-nhs")
// }

// main()

module.exports = {
    startMeet
}
