# Meet Bot - For google meet.

A bot that uses Playwright to play music in Google Meet via YouTube Music.

# Requirements

- 

# Setup

- Clone the repository.

# Commands

-   `/play` `<songName>`

    -   description - Plays a song.

-   `/p` `<songName>`

    -   Also...plays a song.

-   `/pause`

    -   C'mon, it's in the name.

-   `/resume`

    -   IT'S RIGHT THERE IN THE NAME!

-   `/toggle`

    -   Toggles the current state. Play, pause, play, pause, play...

-   `/help`
    -   Bot 101, retrieves list of commands

---

# Structure

-   Frontside - Observe the meet chat for bot commands. On getting command, execute it.
-   Backside - Recieves commands from frontside, searches music on youtube music using Playwright. The tab playing the music is cast to the meet, thus allowing it to play audio inside the meet.
