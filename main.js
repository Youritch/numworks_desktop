const {app, BrowserWindow, ipcMain, Menu, screen} = require("electron");
const path = require("path");

const createWindow = () => {
	//get screen size
	const {screen} = require("electron");
	const primaryDisplay = screen.getPrimaryDisplay();
	const {width, height} = primaryDisplay.workAreaSize;
	const win = new BrowserWindow({
		icon: "/Users/youri/Documents/GitHub/numworks_desktop/icon.png",
		x: 0,
		y: 0,
		titleBarStyle: "customButtonsOnHover",
		height: height,
		width: Math.floor(height * 0.5094) + 1,
		resizable: false,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
		movable: true,
	});
	const winFull = new BrowserWindow({
		x: Math.floor(width * 0.25) + Math.floor(height * 0.5094) + 1,
		y: 0,
		titleBarStyle: "customButtonsOnHover",
		parent: win,
		width: width - (this.x),
		height: Math.floor((this.width * 0.3807) / 3),
		show: false,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});
	const winHide = new BrowserWindow({
		titleBarStyle: "customButtonsOnHover",
		width: Math.floor(width * 0.1),
		height: Math.floor((width * 0.1) / 0.5094),
		x: 0,
		y: 0,
		show: false,
		alwaysOnTop: true,
		resizable: false,
		webPreferences: {
			preload: path.join(__dirname, "preload_hide.js"),
		},
	});
	winHide.loadFile("hide.html");
	const menu = Menu.buildFromTemplate([
		{
			label: app.name,
			submenu: [
				{
					click: () => {
						const winDevTool = BrowserWindow.getFocusedWindow();
						if (winDevTool.webContents.isDevToolsOpened()) return winDevTool.webContents.closeDevTools();
						return winDevTool.webContents.openDevTools();
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
					type: "separator",
				},
				/*{
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
				},*/
				{
					click: () => {
						const winFocus = BrowserWindow.getFocusedWindow();
						const x = Math.min(screen.getCursorScreenPoint().x, (width - winFocus.getSize()[0]));
						winFocus.setPosition(x, 0);
					},
					accelerator: process.platform === "darwin" ? "Cmd+m" : "Alt+m",
					label: "Move",
				},
				{
					click: () => {
						if (winHide.isVisible()) {
							win.show();
							winHide.hide();
							return;
						}
						winHide.show();
						win.hide();
						winFull.hide();
						return;
					},
					accelerator: process.platform === "darwin" ? "Cmd+h" : "Alt+h",
					label: "Hide",
				},
			],
		},
	]);
	Menu.setApplicationMenu(menu);
	win.loadFile("simulator.html");
	return {win: win, winFull: winFull, winHide: winHide};
};
app.whenReady().then(() => {
	module.exports.wins = createWindow();
	ipcMain.on("hide", (wins)=>{
		console.log(this.wins);
		if (this.wins.winHide.isVisible()) {
			this.wins.win.show();
			this.wins.winHide.hide();
			return;
		}
		this.wins.winHide.show();
		this.wins.win.hide();
		this.wins.winFull.hide();
		return;
	});
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			module.exports.wins = createWindow();
		}
	});
	ipcMain.handleOnce("quit", () => {
		app.quit();
	});
});
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
	app.quit();
});
