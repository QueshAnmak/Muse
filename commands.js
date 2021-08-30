const { playSong } = require('./youtube.js')

async function processCommand(message, ymusic) {

    await playSong(ymusic, message);

    console.log(message+"!!!!!")
    return "working!"
}

module.exports = {
    processCommand
}