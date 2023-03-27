export default interface IAuthResponse {
	success: boolean
	data: {
		user_token: string
		name: string
	} | null
	meta?: {
		message: string
	}
}