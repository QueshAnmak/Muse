<img src="https://user-images.githubusercontent.com/78043832/136219221-81f3f4a6-762e-4211-bcd6-c915741b8900.png" align="right">

# Muse - Music Bot for Google Meet.

A bot that uses Playwright to play music in Google Meet via YouTube Music.

# Requirements

- python 3
- node 14+
- npm

# Installation

- Download the latest release.
- Unzip files to the desired folder.
- In a shell, navigate to `app` folder and run following command:

	`npm install`

## Register app as native messaging host
- Inside the `app` folder, run `regkeymaker.py`.

## (Optional, but Recommended) Installing extension

- [COMING SOON...MAYBE] For MS Edge users: Install extension from edge add-on store (if they decide to accept it).

Currently the only way to use the extension is via turning the extension developer mode on and loading the extension unpacked.

To load unpacked extension:
- Open the Extension Management page by navigating to chrome://extensions.
	- Alternatively, open this page by clicking on the Extensions menu button and selecting Manage Extensions at the bottom of the menu.
	- Alternatively, open this page by clicking on the Chrome menu, hovering over More Tools then selecting Extensions
- Enable Developer Mode by clicking the toggle switch next to Developer mode.
- Click the Load unpacked button and select the extension directory.

# How To Use

## Using the extension

- Go to the Meet tab. (just making sure it is the active tab)
- Click on the Muse extension.
  - Muse will take a minute to setup. DO NOT INTERACT WITH THE NEW BROWSER EXCEPT FOR MINIMIZING IT!!! The browser will automatically minimize when Muse is set up.
- The bot must be admitted by the meeting host.
- Done (ツ) *Badum Tsss!*

## Using CLI

- Go to app folder.
- Run the following command, replacing `<meetLink>` with the Google Meet URL.
  
  `node bot.js start --link=<meetLink>`

# Commands

Use the commands in the Meet chat.

-   `/play` `<songName>`

    -   Plays a song. (replace `<songName>` with the name of the song)

-   `/p` `<songName>`

    -   Also...plays a song.

-   `/pause`

    -   C'mon, it's in the name.

-   `/resume`

    -   IT'S RIGHT THERE IN THE NAME!

-   `/toggle`

    -   Toggles the current state. Play, pause, play, pause, play...

-	`/exit`, `/leave`, `/bye`

	-	Kick Muse outta the meeting!

-   `/help`
    -   Muse 101, retrieves list of commands

---

