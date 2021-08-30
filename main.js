const {startBrowser} = require('./browser')
const {startMeet} = require('./meet')
const {startYMusic} = require('./youtube')

async function main() {

    const browser = await startBrowser()
    // await googleSignIn(browser, 'therealmeetbot@gmail.com', 'playthatfunkymusicwhiteboy')
    const meetLink = "https://meet.google.com/qiw-gupj-ita"
    const meet = await startMeet(browser, meetLink);
    
    const divHandle = await meet.$('.z38b6[jsname="xySENc"]')
    let anotherDivHandle ;
    await divHandle.evaluate(div => {
        
        new MutationObserver(async (mutationsList, observer) => {

          anotherDivHandle = mutationsList[0].addedNodes[0]

          if(anotherDivHandle.className === 'GDhqjd'){
            anotherDivHandle = anotherDivHandle.childNodes[1]
          }

          anotherDivHandle = anotherDivHandle.innerText
          console.log(anotherDivHandle)

          if(anotherDivHandle.includes('/play')){
            let string = "";
            for(let i = 0; i < anotherDivHandle.length; i++){
              if(anotherDivHandle[i] === ' '){
                string = anotherDivHandle.slice(i+1, anotherDivHandle.length)
                break;
              }
            }

            // const page = await startYMusic(browser)
            // await playSong(page, string)
            // This is giving error that await is only valid for async function for startYMusic
          }

        }).observe(div, { childList: true, subtree: true });

      });

}

main()