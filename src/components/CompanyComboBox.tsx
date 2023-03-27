import Api from '../api/yclients/Api'
import {ChangeEvent, useEffect, useState} from 'react'
import Companies from '../api/yclients/Companies'
import {ICompany} from '../api/yclients/ICompaniesResponse'

interface ICompanyComboBoxProps {
	api: Api
	onChange?: (companyId: string) => void
}

export default function CompanyComboBox({api, onChange}: ICompanyComboBoxProps) {
	const [companyList, setCompanyList] = useState<ICompany[]>([])
	useEffect(() => {
		const companies = new Companies(api)
		companies.get().then(result => {
			setCompanyList(result.data)
		})
	})
	const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		if (onChange) {
			onChange(event.target.value)
		}
	}
	return (
		<div>
			{companyList.length === 0 ? <div>Нет данных</div> : (
				<select onChange={onSelectChange}>
					<option>Выберите компанию...</option>
					{companyList.map(company => (
						<option value={company.id}>
							{company.title}
						</option>
					))}
				</select>
			)}
		</div>
	)
}