# Meet Bot - For google meet.
A bot that uses Playwright to play music in google meets.

# Structure

* Frontside - Listening the meet chat for bot commands. On getting command, send request to API running on localhost in the backside.
* Backside - API that recieves commands from frontside, searches music on youtube music using Playwright. The tab playing the music is cast to the meet, thus allowing it to play audio inside the meet.