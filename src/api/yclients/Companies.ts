import Point from './Point'
import Api from './Api'
import ICompaniesResponse from './ICompaniesResponse'

/**
 * @link https://bit.ly/3Qg5ypi
 */
interface IQueryCompanies {
	my?: boolean
}

const defaultQueryParameters: Required<IQueryCompanies> = {
	my: false
}

function prepareQueryString(queryParameters: IQueryCompanies): string {
	const requiredQueryParameters: Required<IQueryCompanies> = Object.assign({}, defaultQueryParameters, queryParameters)
	const queryParameterList: string[] = []
	for (let parameter in requiredQueryParameters) {
		switch (parameter) {
			case 'my':
				queryParameterList.push(requiredQueryParameters.my ? 'my=1' : 'my=0')
				break
			default:
				throw new Error(`Неизвестный параметр ${parameter}`)
		}
	}
	return '?' + queryParameterList.join('&')
}

export default class Companies extends Point {
	public async get(queryParameters: IQueryCompanies = {}): Promise<ICompaniesResponse> {
		const url = Api.getUrl('companies', prepareQueryString(queryParameters))
		const response = (
			await fetch(url, {
				method: 'get',
				redirect: 'follow',
				headers: this.api.headers
			})
		)
		return await response.json()
	}
}