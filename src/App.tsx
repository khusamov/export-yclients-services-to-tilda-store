import React, {useState} from 'react'
import styles from './App.module.scss'
import AuthForm, {TAuthFormSubmit} from './components/AuthForm'
import YclientsApi from './api/YclientsApi'
import useUserToken from './hooks/useUserToken'
import {downloadCsvFile} from './functions/download'

export default function App() {
	const [userToken, setUserToken] = useUserToken()
	const [serverMessage, setServerMessage] = useState<string | null>(null)
	const isAuth = userToken !== null

	const onAuthFormSubmit: TAuthFormSubmit = async ({login, password}) => {
		const body = await YclientsApi.auth(login, password)
		if (body.success && body.data) {
			const userToken = body.data.user_token
			setUserToken(userToken)
		} else {
			const message = body.meta?.message ? body.meta.message : 'Сервер не вернул сообщение'
			setServerMessage(message)
		}
	}

	const onLogoutButtonClick = () => {
		setUserToken(null)
	}

	const onDownloadButtonClick = () => {
		downloadCsvFile('fdsfsd', 'fdsfsd')
	}

	return (
		<div>
			<p>
				Скрипт для экспорта услуг из сервиса 'yclients.com' в файл импорта товаров для сервиса 'store.tilda.cc'.
			</p>
			<div>
				{serverMessage && <div className={styles.ServerMessageStyle}>{serverMessage}</div>}
				{isAuth ? <div>Аутентификация выполнена успешно. Получен токен: {userToken}</div> : <AuthForm onSubmit={onAuthFormSubmit}/>}
				{isAuth && <div><button onClick={onLogoutButtonClick}>Отмена аутентификации</button></div>}
				{isAuth && <div><button onClick={onDownloadButtonClick}>Скачать файл с услугами</button></div>}
			</div>
		</div>
	)
}
