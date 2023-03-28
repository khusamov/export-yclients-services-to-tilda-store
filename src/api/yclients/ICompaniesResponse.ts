export interface ICompany {
	id: string
	title: string
}

export default interface ICompaniesResponse {
	success: boolean
	data: ICompany[]
	meta?: {
		message: string
	}
}