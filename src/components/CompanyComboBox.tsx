import Api from '../api/yclients/Api'
import {ChangeEvent, useEffect, useState} from 'react'
import Companies from '../api/yclients/Companies'
import {ICompany} from '../api/yclients/ICompaniesResponse'

enum FetchState {
	Download,
	NotFound,
	Ready
}

const stateMessageMap: Record<FetchState, string> = {
	[FetchState.Download]: 'Загружается список компаний...',
	[FetchState.NotFound]: 'Список компаний пустой',
	[FetchState.Ready]: 'Готово'
}

interface ICompanyComboBoxProps {
	api: Api
	onChange?: (companyId: string) => void
}

export default function CompanyComboBox({api, onChange}: ICompanyComboBoxProps) {
	const [fetchState, setFetchState] = useState<FetchState>(FetchState.Download)
	const [companyList, setCompanyList] = useState<ICompany[]>([])
	useEffect(() => {
		const companies = new Companies(api)
		companies.get().then(result => {
			if (result.success && result.data.length) {
				setCompanyList(result.data)
				setFetchState(FetchState.Ready)
			} else {
				setFetchState(FetchState.NotFound)
			}
		})
	}, [])
	const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		if (onChange) {
			onChange(event.target.value)
		}
	}
	return (
		fetchState === FetchState.Ready ? (
			<select onChange={onSelectChange}>
				<option>Выберите компанию...</option>
				{companyList.map((company, index) => (
					<option key={index} value={company.id}>
						{company.title}
					</option>
				))}
			</select>
		) : (
			<span>{stateMessageMap[fetchState]}</span>
		)
	)
}