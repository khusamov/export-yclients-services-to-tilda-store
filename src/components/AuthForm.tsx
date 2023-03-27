import {ChangeEvent, FormEvent, useState} from 'react'

interface IAuthFormData {
	login: string
	password: string
	bearer: string
}

export type TAuthFormSubmit = (data: IAuthFormData, event: FormEvent) => void

interface IAuthFormProps {
	onSubmit?: TAuthFormSubmit
}

export default ({onSubmit = () => {}}: IAuthFormProps) => {
	const [login, setLogin] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [bearer, setBearer] = useState<string>('')

	const onLocalSubmit = (event: FormEvent) => {
		onSubmit({login, password, bearer}, event)
		event.preventDefault()
	}

	const onLoginChange = (event: ChangeEvent<HTMLInputElement>) => setLogin(event.target.value)
	const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
	const onBearerChange = (event: ChangeEvent<HTMLInputElement>) => setBearer(event.target.value)

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
				Токен партнера: <input type='text' value={bearer} onChange={onBearerChange}/>
			</div>
			<div>
				Токен партнера можно получить в
				<a href='https://yclients.com/appstore/developers'>Маркетплейсе интаграций</a>.
				Для этого там надо зарегистрироваться, зайти в свой личный кабинет
				и скопировать токен партнера в разделе «Настройки аккаунта».
			</div>
			<div>
				<button type='submit'>
					Войти
				</button>
			</div>
		</form>
	)
}