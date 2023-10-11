export const cssify = (selector: string) =>
	`${selector} { visibility: hidden }`

export const findMatch = (
	regexes: Array<string>,
	url: string,
): string | null =>
	regexes.find(regex => new RegExp(regex).test(url)) ??
	null
