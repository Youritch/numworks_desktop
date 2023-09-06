const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	hide: () => {
		console.log(ipcRenderer.send("hide"));
	}
});
