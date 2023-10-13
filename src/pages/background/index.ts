import { cssify, findMatch } from './utils'

console.log('background script loaded')
console.log('Hello from the background!')

chrome.runtime.onInstalled.addListener(details => {
	console.log('Extension installed:', details)
})

chrome.tabs.onUpdated.addListener(async (tabId, ch, _) => {
	if (ch.status === 'complete') {
		const t = (
			await chrome.tabs.query({
				active: true,
				lastFocusedWindow: true,
			})
		)[0]

		if (!t?.url) return

		const url = t.url

		const hash: Record<string, Array<string>> = (
			await chrome.storage.local.get('hash')
		).hash ?? {}

		const key = findMatch(Object.keys(hash), url)

		console.log('url', url)
		console.log('key', key)

		if (!key) return

		try {
			await chrome.scripting.insertCSS({
				target: { tabId },
				css: hash[key].map(cssify).join('\n'),
			})
		} catch {
			console.log("can't access")
		}
	}
})
