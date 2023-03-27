import React, {useState} from 'react'
import {stringify} from 'csv-stringify/browser/esm/sync'
import styles from './App.module.scss'
import AuthForm, {TAuthFormSubmit} from './components/AuthForm'
import useUserToken from './hooks/useUserToken'
import {downloadCsvFile} from './functions/download'
import Api from './api/yclients/Api'
import Auth from './api/yclients/Auth'
import useApi from './api/yclients/useApi'
import CompanyComboBox from './components/CompanyComboBox'

export default function App() {
	const [api, setApi] = useApi()
	const [userToken, setUserToken] = useUserToken()
	const [serverMessage, setServerMessage] = useState<string | null>(null)
	const isAuth = (userToken !== null && api !== null)

	const onAuthFormSubmit: TAuthFormSubmit = async ({login, password, bearer}) => {
		const api = new Api(bearer)
		setApi(api)
		const auth = new Auth(api)
		const body = await auth.post(login, password)
		if (body.success && body.data) {
			const userToken = body.data.user_token
			setUserToken(userToken)
			setServerMessage(null)
		} else {
			const message = body.meta?.message ? body.meta.message : 'Сервер не вернул сообщение'
			setServerMessage(message)
			setApi(null)
		}
	}

	const onLogoutButtonClick = () => {
		setUserToken(null)
		setApi(null)
	}

	const onDownloadButtonClick = () => {
		const exportData = stringify([{field1: 'aaaaa', field2: 'bbbb'}, {field1: 'aaaaa2', field2: 'bbbb2'}])
		downloadCsvFile('fdsfsd', exportData)
	}

	return (
		<div>
			<p>
				Скрипт для экспорта услуг из сервиса 'yclients.com' в файл импорта товаров для сервиса 'store.tilda.cc'.
			</p>
			<div>
				{serverMessage && <div className={styles.ServerMessageStyle}>{serverMessage}</div>}
				{isAuth ? <div>Аутентификация выполнена успешно.</div> : <AuthForm onSubmit={onAuthFormSubmit}/>}
				{isAuth && <div><button onClick={onLogoutButtonClick}>Отмена аутентификации</button></div>}
				{isAuth && <div><button onClick={onDownloadButtonClick}>Скачать файл с услугами</button></div>}
				{isAuth && <CompanyComboBox api={api}/>}
			</div>
		</div>
	)
}
