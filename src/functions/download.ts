/**
 * @link https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
 * @param {string} filename
 * @param {Blob} blob
 */
export default function download(filename: string, blob: Blob) {
	const anchor = window.document.createElement('a')
	anchor.href = window.URL.createObjectURL(blob)
	anchor.download = filename
	document.body.appendChild(anchor)
	anchor.click()
	document.body.removeChild(anchor)
}

export function downloadTextFile(filename: string, content: string) {
	download(filename + '.txt', new Blob([content], {type: 'text/plain'}))
}

export function downloadCsvFile(filename: string, content: string) {
	download(filename + '.csv', new Blob([content], {type: 'text/csv'}))
}