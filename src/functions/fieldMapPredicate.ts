export default function fieldMapPredicate(fieldMap: Record<string, string>) {
	return (
		(item: Record<string, any>) => {
			const result: Record<string, any> = {}
			for (const fieldName in fieldMap) {
				result[fieldMap[fieldName]] = item[fieldName]
			}
			return result
		}
	)
}