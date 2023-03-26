import {ChangeEvent, FormEvent, useState} from 'react'

interface IAuthFormData {
	login: string
	password: string
}

export type TAuthFormSubmit = (data: IAuthFormData, event: FormEvent) => void

interface IAuthFormProps {
	onSubmit?: TAuthFormSubmit
}

export default ({onSubmit = () => {}}: IAuthFormProps) => {
	const [login, setLogin] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const onLocalSubmit = (event: FormEvent) => {
		onSubmit({login, password}, event)
		event.preventDefault()
	}

	const onLoginChange = (event: ChangeEvent<HTMLInputElement>) => setLogin(event.target.value)
	const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)

	return (
		<form onSubmit={onLocalSubmit}>
			<div>Аутентификация на сайте yclients.com</div>
			<div>
				Логин: <input type='text' value={login} onChange={onLoginChange}/>
			</div>
			<div>
				Пароль: <input type='password' value={password} onChange={onPasswordChange}/>
			</div>
			<div>
				<button type='submit'>
					Войти
				</button>
			</div>
		</form>
	)
}