document.getElementById('start-bot').addEventListener('click', async () =>
{
    console.log('this is popup.js');
    const currentTab = await getCurrentTab();

    console.log(currentTab);

    const url = currentTab.url;

    console.log(url);

    const MEET_URL_PATTERN = new RegExp('^https://meet.google.com/[a-z]{3}-[a-z]{4}-[a-z]{3}$');

    if (MEET_URL_PATTERN.test(url))
    {
        return startBot(url);
    }

    // console.log(`Sent ${url}.`)
});

async function getCurrentTab()
{
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function startBot(url)
{
    const port = chrome.runtime.connectNative('com.queshanmak.meetbot');
    
    port.onMessage.addListener(function (msg)
    {
        console.log("Received" + msg);
    });

    port.onDisconnect.addListener(function ()
    {
        console.log("Disconnected");
    });
 
    port.postMessage(url);
    console.log(`Sent ${url}.`)
}