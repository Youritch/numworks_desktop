module.exports = {
	packagerConfig: {
		icon: "/Users/youri/Documents/GitHub/numworks_desktop/imgs/icon"
	},
	rebuildConfig: {},
	makers: [
		/*{
			name: "@electron-forge/maker-zip",
			platforms: ["darwin", "linux"],
			config: {
				// Config here
			}
		},
		{
			name: '@electron-forge/maker-deb',
			config: {
				options: {
					maintainer: 'Youritch',
					homepage: 'https://github.com/Youritch/numworks_desktop'
					icon: "./Users/youri/Documents/GitHub/numworks_desktop/imgs/icon.png"
				}
			}
		},
		{
			name: '@electron-forge/maker-squirrel',
			config: {
				icon: "./Users/youri/Documents/GitHub/numworks_desktop/imgs/icon.png"
				//certificateFile: './cert.pfx',
				//certificatePassword: process.env.CERTIFICATE_PASSWORD
			}
		},*/
		{
			name: '@electron-forge/maker-zip',
			platforms: ['darwin', 'linux','win32'],
		}
	]
	
};
