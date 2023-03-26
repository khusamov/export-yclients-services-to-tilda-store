import {useState} from 'react'

export default function useUserToken(): [string | null, (userToken: string | null) => void] {
	const [userToken, setUserToken] = useState<string | null>(localStorage.getItem('userToken'))
	return [userToken, (userToken: string | null) => {
		setUserToken(userToken)
		if (userToken) {
			localStorage.setItem('userToken', userToken)
		} else {
			localStorage.removeItem('userToken')
		}
	}]
}