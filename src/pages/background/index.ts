import { cssify, findMatch } from './utils'

console.log('background script loaded')
console.log('Hello from the background!')

chrome.runtime.onInstalled.addListener(details => {
	console.log('Extension installed:', details)
})

chrome.tabs.onUpdated.addListener(async (tabId, ch, _) => {
	if (ch.status === 'complete') {
		const [{ url }] = await chrome.tabs.query({
			active: true,
			lastFocusedWindow: true,
		})

		if (!url) return

		const hash: Record<
			string,
			Array<string>
		> = await chrome.storage.local.get(null)

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
