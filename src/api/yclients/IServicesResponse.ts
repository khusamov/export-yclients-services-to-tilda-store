interface IImageGroup {
	images: {
		basic: {
			path: string
		}
	}
}

/**
 * @link https://developers.yclients.com/ru/#tag/Uslugi
 */
export interface IService {
	id: number
	title: string
	category_id: number
	comment: string
	price_min: number
	price_max: number
	image_group: IImageGroup[] | IImageGroup
	active: number
}

export default interface IServicesResponse {
	success: boolean
	data: IService[]
	meta?: {
		message: string
	}
}