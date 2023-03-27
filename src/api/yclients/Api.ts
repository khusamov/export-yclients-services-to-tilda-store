export default class Api {
	public readonly headers: Headers

	public static getUrl(path: string): string {
		return 'https://api.yclients.com/api/v1/' + path
	}

	public constructor(public readonly bearer: string) {
		this.headers = new Headers({
			'Accept': 'application/vnd.yclients.v2+json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${bearer}`
		})
	}

	public set userToken(userToken: string) {
		this.headers.set('Authorization', `Bearer ${this.bearer}, User ${userToken}`)
	}
}