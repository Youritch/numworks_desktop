module.exports = {
	packagerConfig: {
		icon: "/Users/youri/Documents/GitHub/numworks_desktop/imgs/icon"
	},
	rebuildConfig: {},
	makers: [
		{
			name: "@electron-forge/maker-squirrel",
			config: {},
		},
		{
			name: "@electron-forge/maker-zip",
			platforms: ["darwin"],
		},
		{
			name: "@electron-forge/maker-deb",
			config: {
				options: {
					icon: "./Users/youri/Documents/GitHub/numworks_desktop/imgs/icon.png"
				}
			},
		},
		{
			name: "@electron-forge/maker-rpm",
			config: {},
		},
	],
	
};
