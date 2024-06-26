import { getSubCategoryAPI } from '@/actions/category'
import { subItemCategoryDataType } from '@/types/categoryDataType'
import Link from 'next/link'

export default async function Page(props: {
  params: { categoryId: number; subcategory: number }
}) {
  // console.log(props.params.categoryId, props.params.subcategory
  const subCategory = props.params.subcategory
  const subCategoryData: subItemCategoryDataType =
    await getSubCategoryAPI(subCategory)
  const stockData = subCategoryData.stockData
  return (
    <main>
      <div className="font-bold text-xl p-2 w-full h-16 fixed flex items-center">
        {subCategoryData.mainCategoryName} {' > '}{' '}
        {subCategoryData.subCategoryName}
      </div>
      <ul className="top-16 relative">
        {stockData.map((stock: any) => (
          <Link href={`/stock/${stock.stockCode}`}>
            <li
              key={stock.id}
              className="w-full h-12 flex p-10 items-center border-b-2 border-gray-200"
            >
              {stock.stockName}
            </li>
          </Link>
        ))}
      </ul>
    </main>
  )
}
