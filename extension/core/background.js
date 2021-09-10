console.log('Muse waiting.');

var activeBots = {};

chrome.action.onClicked.addListener(async () =>
{
    let url = (await getCurrentTab()).url;
    let port = activeBots[url];

    if (port === undefined)
    {
        let newPort = await init(url);
        activeBots[url] = newPort;
        console.log('Muse on.')

    }
    else
    {
        port.postMessage('Shut down.');
        port.disconnect();
        delete activeBots[url];
        console.log('Muse off.')
    }
});


async function init(url)
{
    const MEET_URL_PATTERN = new RegExp('^https://meet.google.com/[a-z]{3}-[a-z]{4}-[a-z]{3}$');

    if (MEET_URL_PATTERN.test(url))
    {
        console.log("Starting Muse.");
        return startBot(url);
    }
    else
    {
        console.log(`${url} is not a meet!!!`);
    }
}

async function getCurrentTab()
{
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function startBot(url)
{
    let port = await chrome.runtime.connectNative('com.queshanmak.muse');
    // console.log(port)
    port.onMessage.addListener(function (msg)
    {
        console.log(`Received -> ${msg}`);
    });

    port.onDisconnect.addListener(function ()
    {
        port.postMessage('Shut down.');
        port.disconnect();
        delete activeBots[url];
        console.log('Muse off.')
    });

    port.postMessage(url);

    return port;
}