const { startBrowser } = require('./browser')
const { startMeet } = require('./meet')
const { startYMusic, playSong } = require('./youtube')
const { processCommand } = require('./commands')

async function main() {

    const browser = await startBrowser()
    // await googleSignIn(browser, 'therealmeetbot@gmail.com', 'playthatfunkymusicwhiteboy')
    const meetLink = "https://meet.google.com/jbu-nayj-rpy"
    const ymusic = await startYMusic(browser)
    const meet = await startMeet(browser, meetLink);
    
    const divHandle = await meet.$('.z38b6[jsname="xySENc"]')
    let anotherDivHandle ;

	const someFunction = async (message) => {
		playSong(ymusic,message)
	}

	await meet.exposeFunction('processCommand', processCommand)
	await meet.exposeFunction('playSong', playSong)
	await meet.exposeFunction('someFunction', someFunction)

    await divHandle.evaluate(div => {

		new MutationObserver(async (mutationsList, observer) => {

			anotherDivHandle = mutationsList[0].addedNodes[0]
			
			if (anotherDivHandle === undefined) return;

			if(anotherDivHandle.className === 'GDhqjd'){
				anotherDivHandle = anotherDivHandle.childNodes[1]
			}

			anotherDivHandle = anotherDivHandle.innerText

			let message = anotherDivHandle;

			console.log(message);
			// let result = await processCommand(ymusic,message);
			// await playSong(ymusic,message);
			await someFunction(message);
			// console.log(result);


      }).observe(div, { childList: true, subtree: true });


      });

}

main()