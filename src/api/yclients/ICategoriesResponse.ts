export interface ICategory {
	id: number
	title: string
}

export default interface ICategoriesResponse {
	success: boolean
	data: ICategory[]
	meta?: {
		message: string
	}
}