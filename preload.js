const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	quit: () => ipcRenderer.invoke("quit"),
});
