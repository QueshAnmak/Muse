const { playMusic, pauseMusic, resumeMusic, toggleMusic } = require('./youtube')
const { sendMsgToMeet } = require('./meet')

/**
 * Check if  the message is a command.
 * 
 * If message is a command, execute command.
 * @param {string} message 
 * @param {Array} pages 
 */
async function processCommand(message, pages) {
    
    const command = await decipherMsg(message);
    if (command === null) return null;

    const { ymusic, meet } = pages;
    const { cmdName, args } = command;
    var reply;

    switch (cmdName.toLowerCase()) {
        
        case 'p':
        case 'play':
            reply = await playMusicCmd(ymusic, args);
            break;

        case 'pause':
            reply = await pauseMusicCmd(ymusic);
            break;

        case 'resume':
            reply = await resumeMusicCmd(ymusic);
            break;

        case 'toggle':
            reply = await toggleMusicCmd(ymusic);
            break;
        
        case 'h':
        case 'help':
            reply = await helpCmd();
            break;

        default:
            result = 'Invalid Command!!!';
    }

    await sendMsgToMeet(meet, reply);
}

/**
 * Checks if message is command:
 * * If it is, returns an object containing command details.
 * * Else returns null.
 * @param {string} message 
 * @returns {Promise<{ cmdName: string, args: string }>}
 */
async function decipherMsg(message) {
    
    const MATCH_COMMAND = /^\/(?<cmdName>\w+)\s*(?<args>(\w|\s)*\w)?\s*$/i;
    const command = message.match(MATCH_COMMAND);
    
    // if it is not a command return null
    if (command === null) return null;

    return command.groups;
}

/**
 * Return the list of commands.
 */
async function helpCmd() {

    const COMMAND_LIST = 
    `
    /play \<songName> - Plays a song.
    /p \<songName> - Also...plays a song.
    /pause - C'mon, it's in the name.
    /resume - IT'S RIGHT THERE IN THE NAME!
    /toggle - Play, pause, play, pause, play...
    /help - Bot 101, specially designed for dummies. :)
    `

}

/**
 * Command for playing music.
 * @param {page} ymusic 
 * @param {string} args
 * @returns {Promise<"Playing [songname] by [artist]"|"Enter a song!!!"|"No songs found.">}
 */
async function playMusicCmd(ymusic, args) {

    if ( args === undefined ) return 'Enter a song!!!';
    
    const query = args;
    const songData = await playMusic(ymusic, query);

    if (songData === null) return 'No songs found.';

    const reply = `Playing ${songData.name} by ${songData.artist}`

    return reply;
}

async function pauseMusicCmd(ymusic) {

    const reply = await pauseMusic(ymusic);
    return reply;
}

async function resumeMusicCmd(ymusic) {

    const reply = await resumeMusic(ymusic);
    return reply;
}

async function toggleMusicCmd(ymusic) {
    
    const reply = await toggleMusic(ymusic);
    return reply;
}

module.exports = {
    processCommand
}