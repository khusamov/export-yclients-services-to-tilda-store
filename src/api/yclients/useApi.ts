import {useState} from 'react'
import Api from './Api'

export default function useApi(): [Api | null, (api: Api | null) => void] {
	const bearer = localStorage.getItem('partnerToken')
	const [api, setApi] = useState<Api | null>(bearer ? new Api(bearer) : null)
	return [api, (api: Api | null) => {
		if (api === null) {
			localStorage.removeItem('partnerToken')
			setApi(null)
		} else {
			localStorage.setItem('partnerToken', api.bearer)
			setApi(api)
		}
	}]
}