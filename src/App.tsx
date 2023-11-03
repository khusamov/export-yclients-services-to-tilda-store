import React, {useState} from 'react'
import {stringify} from 'csv-stringify/browser/esm/sync'
import {IService} from './api/yclients/IServicesResponse'
import styles from './App.module.scss'
import AuthForm, {TAuthFormSubmit} from './components/AuthForm'
import useUserToken from './hooks/useUserToken'
import {downloadCsvFile} from './functions/download'
import Api from './api/yclients/Api'
import Auth from './api/yclients/Auth'
import useApi from './api/yclients/useApi'
import CompanyComboBox from './components/CompanyComboBox'
import IGood, {fieldMap} from './interfaces/tilda/IGood'
import fieldMapPredicate from './functions/fieldMapPredicate'
import Services from './api/yclients/Services'
import Categories from './api/yclients/Categories'
import {emptyImagePath} from './const/emptyImagePath'

const exportDataFilterPredicate = (data: IGood) => {
	const category = data.category?.toLowerCase().trim()
	return category !== 'администрирование' && category !== 'архив' && category !== 'техническая'
}

export default function App() {
	const [companyId, setCompanyId] = useState<number>(520827)
	const [api, setApi] = useApi()
	const [userToken, setUserToken] = useUserToken()
	const [serverMessage, setServerMessage] = useState<string | null>(null)
	const isAuth = (userToken !== null && api !== null)
	if (api && userToken) {
		api.userToken = userToken
	}

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

	const onDownloadButtonClick = async () => {
		/**
		 * Фильтрация услуг.
		 * Не все услуги подлежат копированию в файл.
		 * @param {IService} service
		 * @returns {boolean}
		 */
		const serviceFilterPredicate = (service: IService) => {
			// Оставляет только те услуги, которые доступны для онлайн записи (active=1).
			// https://developers.yclients.com/ru/#tag/Uslugi
			return service.active === 1
		}

		if (api) {
			const services = new Services(api)
			const categories = new Categories(api)
			const resultOfCategories = await categories.get(companyId)
			const resultOfServices = await services.get(companyId)
			if (!resultOfCategories.success) {
				setServerMessage(resultOfCategories.meta?.message || 'Сервер не вернул сообщение')
			}
			if (!resultOfServices.success) {
				setServerMessage(resultOfServices.meta?.message || 'Сервер не вернул сообщение')
			}
			if (resultOfServices.success && resultOfCategories.success) {
				const exportData: IGood[] = []
				for (const data of resultOfServices.data.filter(serviceFilterPredicate)) {
					const category = resultOfCategories.data.find(category => category.id === data.category_id)
					const imageGroup = data.image_group instanceof Array ? data.image_group[0] : data.image_group
					exportData.push({
						tildaUid: data.id,
						title: data.title,
						...(category ? {category: category.title} as IGood : {}),
						text: data.comment,
						photo: imageGroup ? imageGroup.images.basic.path : emptyImagePath,
						price: data.price_min
					})
					if (data.price_min !== data.price_max && data.price_min && data.price_max) {
						exportData.push({
							tildaUid: data.id * 1000 + 1,
							title: data.title,
							...(category ? {category: category.title} as IGood : {}),
							price: data.price_min,
							parentUID: data.id
						})
						exportData.push({
							tildaUid: data.id * 1000 + 2,
							title: data.title,
							...(category ? {category: category.title} as IGood : {}),
							price: data.price_max,
							parentUID: data.id
						})
					}
				}
				const preparedExportData = exportData.filter(exportDataFilterPredicate).map(fieldMapPredicate(fieldMap))
				const exportCsvData = (
					// @link https://csv.js.org/stringify/
					stringify(preparedExportData, {
						header: true,
						quoted: true,
						delimiter: ';'
					})
				)
				downloadCsvFile('Услуги', exportCsvData)
			}
		}
	}

	const onCompanyComboBoxChange = (companyId: string) => {
		setCompanyId(Number(companyId))
	}

	return (
		<div>
			<p>
				Скрипт для экспорта услуг из сервиса 'yclients.com' в файл импорта товаров для сервиса 'store.tilda.cc'.
			</p>
			<div>
				{serverMessage && <p className={styles.ServerMessageStyle}>{serverMessage}</p>}
				{isAuth ? <p>Аутентификация выполнена успешно.</p> : <AuthForm onSubmit={onAuthFormSubmit}/>}
				{isAuth && <p><button onClick={onLogoutButtonClick}>Отмена аутентификации</button></p>}
				{isAuth && <p><button onClick={onDownloadButtonClick}>Скачать файл с услугами</button></p>}
				{isAuth && <p><CompanyComboBox api={api} onChange={onCompanyComboBoxChange}/></p>}
			</div>
		</div>
	)
}
