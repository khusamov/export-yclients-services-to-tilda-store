/**
 * Максимальный размер файла для импорта 3 Мб.
 * @link https://help-ru.tilda.cc/online-store-payments/import-export#howto
 */
export default interface IGood {
	tildaUid?: number
	brand?: string
	sku?: string
	mark?: string
	category?: string
	title?: string
	description?: string
	text?: string
	photo?: string
	price?: number
	quantity?: string
	priceOld?: string
	editions?: string
	modifications?: string
	externalID?: string
	parentUID?: number
	weight?: number
	length?: number
	width?: number
	height?: number
	seoTitle?: string
	seoDescription?: string
	seoKeywords?: string
	facebookTitle?: string
	facebookDescription?: string
}

export const fieldMap: Record<string, string> = {
	tildaUid: 'Tilda UID',
	brand: 'Brand',
	sku: 'SKU',
	mark: 'Mark',
	category: 'Category',
	title: 'Title',
	description: 'Description',
	text: 'Text',
	photo: 'Photo',
	price: 'Price',
	quantity: 'Quantity',
	priceOld: 'Price Old',
	editions: 'Editions',
	modifications: 'Modifications',
	externalID: 'External ID',
	parentUID: 'Parent UID',
	weight: 'Weight',
	length: 'Length',
	width: 'Width',
	height: 'Height',
	seoTitle: 'SEO title',
	seoDescription: 'SEO descr',
	seoKeywords: 'SEO keywords',
	facebookTitle: 'FB title',
	facebookDescription: 'FB descr'
}
