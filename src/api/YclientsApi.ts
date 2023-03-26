import YclientsApiHeaders from './YclientsApiHeaders'
import getYclientsApiUrl from './getYclientsApiUrl'
import IYclientsAuthResponse from './IYclientsAuthResponse'

const yclientsApiHeaders = new YclientsApiHeaders('a58fmd48ducnsjyfkab3')

/**
 * @link https://developers.yclients.com/ru/
 */
export default class YclientsApi {
	/**
	 * @link https://developers.yclients.com/ru/#tag/Avtorizaciya
	 * @param {string} login
	 * @param {string} password
	 * @returns {Promise<IYclientsAuthResponse>}
	 */
	public static async auth(login: string, password: string) {
		const response = await fetch(getYclientsApiUrl('auth'), {
			method: 'post',
			redirect: 'follow',
			headers: yclientsApiHeaders,
			body: JSON.stringify({login, password})
		})
		const body: IYclientsAuthResponse = await response.json()
		return body
	}
}