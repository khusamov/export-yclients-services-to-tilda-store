import Point from './Point'
import Api from './Api'

const getUrl = (companyId: number, serviceId?: number) => `company/${companyId}` + (serviceId ? `/services/${serviceId}` : '')

/**
 * @link https://developers.yclients.com/ru/#tag/Uslugi
 */
export default class Services extends Point {
	/**
	 * Получить список услуг / конкретную услугу.
	 * @param {number} companyId ID компании.
	 * @param {number} serviceId ID услуги, если нужно работать с конкретной услугой.
	 * @returns {Promise<any>}
	 */
	public async get(companyId: number, serviceId?: number) {
		const response = (
			await fetch(Api.getUrl(getUrl(companyId, serviceId)), {
				method: 'get',
				redirect: 'follow',
				headers: this.api.headers
			})
		)
		return await response.json()
	}
}