import { useEffect, useRef } from 'react'
import '@pages/options/Options.css'
import { parse, stringify } from 'yaml'

export default function Options(): JSX.Element {
	const textarea = useRef<HTMLTextAreaElement>(null)

	useEffect(
		() =>
			void (async () => {
				if (!textarea.current) return

				const hash = (
					await chrome.storage.local.get('hash')
				).hash

				try {
					textarea.current.value = stringify(hash)
				} catch {
					textarea.current.value =
						"error: can't parse json"
				}
			})(),
		[],
	)

	return (
		<div className="container">
			<h1>Options</h1>
			<br />
			<textarea ref={textarea} />
			<br />
			<button
				onClick={async () => {
					const v = textarea.current?.value
					if (!v) return

					await chrome.storage.local.set({
						hash: parse(v),
					})

					console.log('saved')
				}}
			>
				save
			</button>
		</div>
	)
}
