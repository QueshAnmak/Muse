const { startBrowser } = require('./browser')
const { startMeet } = require('./meet')
const { startYMusic, playSong } = require('./youtube')
const { processCommand } = require('./commands')

async function main() {

    const browser = await startBrowser()
    // await googleSignIn(browser, 'therealmeetbot@gmail.com', 'playthatfunkymusicwhiteboy')
    const meetLink = "https://meet.google.com/wti-ctsz-djp"
    const ymusic = await startYMusic(browser)
    const meet = await startMeet(browser, meetLink);
    
    const divHandle = await meet.$('.z38b6[jsname="xySENc"]')
    let anotherDivHandle ;

    await divHandle.evaluate(div => {
        
        new MutationObserver(async (mutationsList, observer) => {
		
			anotherDivHandle = mutationsList[0].addedNodes[0]
			
			if (anotherDivHandle === undefined) return;

			if(anotherDivHandle.className === 'GDhqjd'){
				anotherDivHandle = anotherDivHandle.childNodes[1]
			}

			anotherDivHandle = anotherDivHandle.innerText
			console.log(anotherDivHandle)

			let message = "";
			for(let i = 0; i < anotherDivHandle.length; i++){
				if(anotherDivHandle[i] === ' '){
				message = anotherDivHandle.slice(i+1, anotherDivHandle.length)
				break;
				}
			}
			// console.log("tmktmktmktmktmktmk")
			// result = await processCommand(message)
			// console.log(result)

        }).observe(div, { childList: true, subtree: true });


      });
}

main()