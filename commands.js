async function processCommand(ymusic,message) {

    await playSong(ymusic,message);

    console.log(message+"!!!!!")
    return "working!"
}

module.exports = {
    processCommand
}