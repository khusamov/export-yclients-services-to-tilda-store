import Api from './Api'
import IAuthResponse from './IAuthResponse'


export default class Auth  {
	public constructor(private api: Api) {}

	/**
	 * @link https://developers.yclients.com/ru/#tag/Avtorizaciya
	 * @param {string} login
	 * @param {string} password
	 * @returns {Promise<IYclientsAuthResponse>}
	 */
	public async post(login: string, password: string): Promise<IAuthResponse> {
		const response = (
			await fetch(Api.getUrl('auth'), {
				method: 'post',
				redirect: 'follow',
				headers: this.api.headers,
				body: JSON.stringify({login, password})
			})
		)
		return await response.json()
	}
}