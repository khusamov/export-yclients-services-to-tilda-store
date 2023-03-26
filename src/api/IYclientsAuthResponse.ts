export default interface IYclientsAuthResponse {
	success: boolean
	data: {
		user_token: string
		name: string
	} | null
	meta?: {
		message: string
	}
}