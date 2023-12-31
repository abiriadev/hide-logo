import type { Manifest } from 'webextension-polyfill'
import pkg from '../package.json'

const manifest: Manifest.WebExtensionManifest = {
	manifest_version: 3,
	name: pkg.displayName,
	version: pkg.version,
	description: pkg.description,
	options_ui: {
		page: 'src/pages/options/index.html',
		open_in_tab: true,
	},
	background: {
		service_worker: 'src/pages/background/index.js',
		type: 'module',
	},
	icons: {
		'128': 'icon-128.png',
	},
	permissions: [
		'activeTab',
		'scripting',
		'tabs',
		'storage',
	],
	host_permissions: ['https://*/*'],
	web_accessible_resources: [
		{
			resources: [
				'contentStyle.css',
				'icon-128.png',
				'icon-34.png',
			],
			matches: [],
		},
	],
}

export default manifest
