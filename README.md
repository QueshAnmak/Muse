# Meet Bot - For google meet.

A bot that uses Playwright to play music in google meets.

# Commands

-   `/play` `<songName>`
    - description - Plays a song.
-   `/p` `<songName>`
    - Also...plays a song.
-   `/pause` 
	- C'mon, it's in the name.
-   `/resume` 
	- IT'S RIGHT THERE IN THE NAME!
-   `/toggle` 
	- Play, pause, play, pause, play...
-   `/help` 
	- Bot 101, specially designed for dummies. :)

---

# Structure

-   Frontside - Listening the meet chat for bot commands. On getting command, send request to API running on localhost in the backside.
-   Backside - API that recieves commands from frontside, searches music on youtube music using Playwright. The tab playing the music is cast to the meet, thus allowing it to play audio inside the meet.
