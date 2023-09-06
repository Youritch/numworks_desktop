const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron");
const path = require("path");
const api = require("./api/api.js");
const createWindow = () => {
	//get screen size
	const { screen } = require("electron");
	const primaryDisplay = screen.getPrimaryDisplay();
	const { height } = primaryDisplay.workAreaSize;
	
	const win = new BrowserWindow({
		y: 0,
		titleBarStyle: "customButtonsOnHover",
		width: Math.floor(height * 0.5094) + 1,
		height: height,
		//backgroundColor: "RGBA(0,0,0,0)",
		resizable: false,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});
	const winFull = new BrowserWindow({
		width: 600,
		height: 300,
		transparent: true,
		backgroundColor: "RGBA(0,0,0,0)",
		show: false,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});
	const menu = Menu.buildFromTemplate([
		{
			label: app.name,
			submenu: [
				{
					click: () => {
						if (win.webContents.isDevToolsOpened()) return win.webContents.closeDevTools();
						return win.webContents.openDevTools();
					},
					label: "Dev Tools",
					accelerator: process.platform === "darwin" ? "Alt+Cmd+I" : "Alt+Shift+I",
				},
				{
					click: () => {
						app.quit();
					},
					accelerator: process.platform === "darwin" ? "Cmd+q" : "Alt+f4",
					label: "Quit",
				},
				{
					click: () => {
						win.webContents.send("load");
						winFull.webContents.send("load");
					},
					accelerator: process.platform === "darwin" ? "Cmd+r" : "Alt+r",
					label: "Reload",
				},
				{
					type: "separator",
				},
				{
					click: () => {
						if (!winFull.isVisible()) {
							winFull.loadFile("simulator_fullscreen.html");
							winFull.show();
							return;
						}
						winFull.hide();
					},
					accelerator: process.platform === "darwin" ? "Cmd+f" : "Alt+f",
					label: "Fullscreen",
				},
			],
		},
	]);
	Menu.setApplicationMenu(menu);
	//win.loadFile("index.html");
	win.loadFile("simulator.html");
	return win;
};
app.whenReady().then(() => {
	createWindow();
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
	app.quit();
});
