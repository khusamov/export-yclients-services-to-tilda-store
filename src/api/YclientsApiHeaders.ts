export default class YclientsApiHeaders extends Headers {
	public constructor(bearer: string) {
		super({
			'Accept': 'application/vnd.yclients.v2+json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${bearer}`
		})
	}
}