import Point from './Point'
import Api from './Api'
import ICompaniesResponse from './ICompaniesResponse'

export default class Companies extends Point {
	public async get(): Promise<ICompaniesResponse> {
		const response = (
			await fetch(Api.getUrl('companies'), {
				method: 'get',
				redirect: 'follow',
				headers: this.api.headers
			})
		)
		return await response.json()
	}
}