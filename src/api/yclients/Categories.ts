import Point from './Point'
import Api from './Api'
import ICategoriesResponse from './ICategoriesResponse'

const getUrl = (companyId: number, categoryId?: number) => `company/${companyId}/service_categories` + (categoryId ? `/${categoryId}` : '')

export default class Categories extends Point {
	public async get(companyId: number, categoryId?: number): Promise<ICategoriesResponse> {
		const response = (
			await fetch(Api.getUrl(getUrl(companyId, categoryId)), {
				method: 'get',
				redirect: 'follow',
				headers: this.api.headers
			})
		)
		return await response.json()
	}
}