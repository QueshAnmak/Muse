const {
	playMusic,
	pauseMusic,
	resumeMusic,
	toggleMusic,
} = require("./youtube");
const { sendMsgToMeet, leaveMeet } = require("./meet");
const {
	closeBrowser
} = require("./browser.js");

/**
 * Check if  the message is a command.
 *
 * If message is a command, execute command.
 * @param {string} message
 * @param {Array} pages
 */
async function processCommand(message, pages)
{
	const command = await decipherMsg(message);
	if (command === null) return null;

	const { ymusic, meet } = pages;
	const { cmdName, args } = command;
	var reply;

	switch (cmdName.toLowerCase())
	{
		case "p":
		case "play":
			reply = await playMusicCmd(ymusic, args);
			break;

		case "pause":
			reply = await pauseMusicCmd(ymusic);
			break;

		case "resume":
			reply = await resumeMusicCmd(ymusic);
			break;

		case "toggle":
			reply = await toggleMusicCmd(ymusic);
			break;

		case "h":
		case "help":
			reply = await helpCmd();
			break;

		case "volume":
			reply = "Coming Soon...";
			break;

		case "exit":
		case "leave":
		case "bye":
			await exitCmd(meet);
			break;

		default:
			reply = "Invalid Command!!!";
	}

	if (reply)
		await sendMsgToMeet(meet, reply);
}

/**
 * Checks if message is command:
 * * If it is, returns an object containing command details.
 * * Else returns null.
 * @param {string} message
 * @returns {Promise<{ cmdName: string, args: string }>}
 */
async function decipherMsg(message)
{
	const MATCH_COMMAND = /^\/(?<cmdName>\w+)\s*(?<args>(\w|\s)*\w)?\s*$/i;
	const command = message.match(MATCH_COMMAND);

	// if it is not a command return null
	if (command === null) return null;

	return command.groups;
}

/**
 * Return the list of commands.
 */
async function helpCmd()
{
	const COMMAND_LIST =
		`
    /play \<songName>
    /p \<songName>
    /pause
    /resume
    /toggle
    /help
    `;
	return COMMAND_LIST;
}

/**
 * Command for playing music.
 * @param {page} ymusic
 * @param {string} args
 * @returns {Promise<"Playing [songname] by [artist]"|"Enter a song!!!"|"No songs found.">}
 */
async function playMusicCmd(ymusic, args)
{
	if (args === undefined) return "Enter a song!!!";

	const query = args;
	const songData = await playMusic(ymusic, query);

	if (songData === null) return "No results.";

	const reply = `Playing ${songData.name} by ${songData.artist}`;

	return reply;
}

async function pauseMusicCmd(ymusic)
{
	const reply = await pauseMusic(ymusic);
	return reply;
}

async function resumeMusicCmd(ymusic)
{
	const reply = await resumeMusic(ymusic);
	return reply;
}

async function toggleMusicCmd(ymusic)
{
	const reply = await toggleMusic(ymusic);
	return reply;
}

async function exitCmd(meet = null)
{
	const EXIT_REPLIES = ["Bella ciao.", "Hasta la vista, baby.", "Adios Amigos.", "So long, and thanks for all the fish!", "Live Long and Prosper.", "Godspeed."];
	const reply = EXIT_REPLIES[Math.floor(Math.random() * EXIT_REPLIES.length)];
	const browser = meet.context();
	
	if (meet !== null)
	{
		await sendMsgToMeet(meet, reply);
		await leaveMeet(meet);
	}
	
	await closeBrowser(browser);
	require('process').exit();
}

module.exports = {
	processCommand,
	exitCmd,
};
