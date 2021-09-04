const { app, BrowserWindow } = require("electron");
const path = require("path");
const main = require("./main");

async function createWindow() {
	// let win = new BrowserWindow({
	// 	 width: 800,
	// 	 height: 600,
	// 	webPreferences: {
	// 		nodeIntegration: true,
	// 		contextIsolation: false,
	// 	},
	// });

	// win.webContents.openDevTools();
	// win.loadFile(path.join(__dirname, "index.html"));
    main("https://meet.google.com/zva-qomd-byy");
}

app.setAsDefaultProtocolClient("meetBot");

function startMeeting(link) {
    console.log("Starting Meet on " + link);
    main(link);
}

app.whenReady().then(() => {
    createWindow();
	console.log("Starting Up Application !");
});
