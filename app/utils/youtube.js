async function startYMusic(browser, page=undefined)
{
	// open ymusic
	const ymusic = (page === undefined) ? await browser.newPage() : page;
	await ymusic.goto("https://music.youtube.com");

	await blockAdsYTmusic(ymusic);
	
	// console.log("Youtube Music opened.");
	return ymusic;
}

async function blockAdsYTmusic(ymusic)
{
	// adblocking node module - https://www.npmjs.com/package/@cliqz/adblocker-playwright
	const { PlaywrightBlocker } = require('@cliqz/adblocker-playwright');
	const fetch = require('cross-fetch').fetch;

	PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) =>
	{
		blocker.enableBlockingInPage(ymusic);
	});
}

/**
 *
 * @param {*} ymusic
 * @param {string} query - The string to be searched.
 * @param {'song'|'playlist'|'artist'|'album'} type - The type of result to
 * select, defaults to song.
 * @returns
 */
async function playMusic(ymusic, query, musicType = "song")
{
	// console.log(`Attempting to play ${query}.`);

	// search query
	let results = await searchQuery(ymusic, query);
	if (results === "No results.") return null;

	await decideMusic(ymusic, musicType);

	// return current song
	const songData = await getCurrentSong(ymusic);
	// console.log(`Playing ${songData.name} by ${songData.artist}!`);

	return songData;
}

/**
 * Search a query in youtube music.
 * @param {*} ymusic
 * @param {string} query
 * @returns
 */
async function searchQuery(ymusic, query)
{
	// wait for search bar to load, just in case
	await ymusic.waitForSelector('tp-yt-paper-icon-button[role="button"]');

	// console.log("Search bar loaded.");

	// focus search bar
	if (
		(await ymusic.getAttribute(
			'tp-yt-paper-icon-button[role="button"]',
			"title"
		)) == "Initiate search"
	)
		await ymusic.click('tp-yt-paper-icon-button[title="Initiate search"]');

	// console.log("Search bar focused.");

	// seacrh song
	await ymusic.fill('input[placeholder="Search"]', query);
	await ymusic.keyboard.press("Enter");

	// console.log(`Searching for ${query}.`);

	// wait for search results to load, if no results, return.
	await ymusic.waitForSelector(
		"#search-page > ytmusic-tabbed-search-results-renderer > div.content.style-scope.ytmusic-tabbed-search-results-renderer"
	);

	if ((await ymusic.$("text=Top result")) === null)
	{
		// console.log("No results.");
		return "No results.";
	}

	// console.log("Results Loaded.");
	return "Results Loaded.";
}

/**
 * Decide which result to select.
 * @param {'song'|'playlist'|'artist'|'album'} musicType - The type of result to
 * select, defaults to song.
 */
async function decideMusic(ymusic, musicType = "")
{
	await ymusic.evaluate(async (musicType) =>
	{
		// currently artist plays song too
		if (musicType === "artist") musicType = "songs";

		// check the musicType of Top result
		const topResult = {};
		topResult.musicType = await document.querySelector(
			" ytmusic-shelf-renderer > #contents > ytmusic-responsive-list-item-renderer > .flex-columns > .secondary-flex-columns > yt-formatted-string > span "
		).innerText;
		// this should instead point to whatever element plays the top result
		// this wont work for artist
		topResult.playButton = await document
			.querySelector(
				" ytmusic-shelf-renderer > #contents > ytmusic-responsive-list-item-renderer "
			)
			.querySelector(" .ytmusic-play-button-renderer ");

		if (topResult.musicType.toLowerCase() === musicType)
		{
			await topResult.playButton.click();
		} else
		{
			if (musicType === "playlist") musicType = "featured playlists";
			else
			{
				musicType += "s";
			}

			// get all titles, store in object
			const getTitlesList = async () =>
			{
				const titles = await document
					.querySelector(
						" .content.style-scope.ytmusic-tabbed-search-results-renderer "
					)
					.querySelectorAll(" h2 ");
				const titleSelectors = {};
				for (idx in titles)
				{
					var titleName = titles[idx].innerText;
					if (typeof titleName == "string")
					{
						var firstItemPlayButton = await titles[
							idx
						].parentElement.querySelector(
							".ytmusic-play-button-renderer"
						);
						titleSelectors[titleName.toLowerCase()] =
							firstItemPlayButton;
					}
				}
				return titleSelectors;
			};
			const titlesList = await getTitlesList();

			if (titlesList[musicType] !== undefined)
			{
				await titlesList[musicType].click();
			} else
			{
				await topResult.playButton.click();
			}
		}
	}, musicType);
}

/**
 * Returns details of the currently playing song.
 * @param {*} ymusic
 * @returns
 */
async function getCurrentSong(ymusic)
{
	await ymusic.waitForSelector(
		'yt-formatted-string[class="byline style-scope ytmusic-player-bar complex-string"]'
	);

	const songName = await ymusic.evaluate(async () =>
	{
		return await document.querySelector(
			'yt-formatted-string[class="title style-scope ytmusic-player-bar"]'
		).title;
	});
	const { songArtist, songAlbum } = await ymusic.evaluate(async () =>
	{
		const otherData = await document.querySelector(
			'yt-formatted-string[class="byline style-scope ytmusic-player-bar complex-string"]'
		);
		const otherSongData = {};
		otherSongData.songArtist = await otherData.children[0].innerText;
		otherSongData.songAlbum = await otherData.children[2].innerText;

		return otherSongData;
	});

	const songData = {
		name: songName,
		artist: songArtist,
		album: songAlbum,
	};
	return songData;
}

// refactor the three functions below into single function.

/**
 * If player is playing then pause, else nobody cares.
 * @param {page} ymusic
 * @returns
 */
async function pauseMusic(ymusic)
{
	if ((await ymusic.getAttribute("#play-pause-button", "title")) == "Pause")
	{
		await ymusic.click("#play-pause-button");
		// console.log("Paused!");
		return "Paused!";
	} else
	{
		// console.log("Already paused!");
		return "Already paused!";
	}
}

/**
 * If player is paused then resume, else nobody cares.
 * @param {page} ymusic
 * @returns
 */
async function resumeMusic(ymusic)
{
	if ((await ymusic.getAttribute("#play-pause-button", "title")) == "Play")
	{
		await ymusic.click("#play-pause-button");
		// console.log("Resumed!");
		return "Resumed!";
	} else
	{
		// console.log("Already playing!");
		return "Already playing!";
	}
}

/**
 * If player is playing then pause, else resume.
 * @param {page} ymusic
 * @returns
 */
async function toggleMusic(ymusic)
{
	await ymusic.click("#play-pause-button");
	const playerState = await ymusic.getAttribute(
		"#play-pause-button",
		"title"
	);

	if (playerState == "Play")
	{
		// console.log("Resumed!");
		return "Resumed!";
	} else
	{
		// console.log("Paused!");
		return "Paused!";
	}
}

// testing function, to be removed in production
async function main()
{
	const { startBrowser } = require("./browser");

	const browser = await startBrowser();
	const ymusic = await startYMusic(browser);

	await playMusic(
		ymusic,
		"iauydvbklaiudblaidufsblaiuwdfbaiydbf;uiawsgbdg;klasgdlfvakiusdhfwoey9r5h243f"
	);
	await ymusic.waitForTimeout(10000);
	await playMusic(ymusic, "darkside");
	await ymusic.waitForTimeout(10000);
	await playMusic(ymusic, "lmaoded playlist");
	await ymusic.waitForTimeout(10000);
	await playMusic(ymusic, "lmaoded");
	await ymusic.waitForTimeout(10000);
	await playMusic(ymusic, "eminem");
	await ymusic.waitForTimeout(10000);
	await playMusic(ymusic, "songs about jane");
	await ymusic.waitForTimeout(10000);

	await pauseMusic(ymusic);
	await ymusic.waitForTimeout(10000);
	await resumeMusic(ymusic);
	await ymusic.waitForTimeout(10000);
	await toggleMusic(ymusic);
}

// main()

module.exports = {
	startYMusic,
	playMusic,
	pauseMusic,
	resumeMusic,
	toggleMusic,
};
