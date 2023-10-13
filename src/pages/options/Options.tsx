import { useEffect, useState, useRef } from 'react'
import '@pages/options/Options.css'
import { parse, stringify } from 'yaml'

export default function Options(): JSX.Element {
	const [hash, setHash] = useState<
		Record<string, Array<string>>
	>({})

	const textarea = useRef<HTMLTextAreaElement>(null)

	useEffect(
		() =>
			void (async () =>
				setHash(
					await chrome.storage.local.get(null),
				))(),
		[],
	)

	return (
		<div className="container">
			<h1>Options</h1>
			<br />
			<textarea
				ref={textarea}
				value={stringify(hash)}
			/>
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
