import { getMainCategoryAPI } from '@/actions/category'
import Headers from '@/components/ui/Headers'
import TitleOfPages from '@/components/ui/TitleOfPages'
import { CategoryData } from '@/lib/categoryData'
import { categoryDataType } from '@/types/categoryDataType'
import { query } from 'firebase/database'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
  const data: categoryDataType[] = await getMainCategoryAPI()

  return (
    <>
      <main>
        <div className="flex flex-wrap justify-around">
          {data.map((category: categoryDataType) => (
            <Link href={`/category/${category.categoryId}`}>
              <section
                key={category.categoryId}
                className="flex flex-col items-center justify-center w-[150px] h-[150px] m-4 text-center rounded-full bg-white "
              >
                <Image
                  src={category.img_url}
                  alt={category.categoryName}
                  width={50}
                  height={50}
                />
                <span className="mt-2 ">{category.categoryName}</span>
              </section>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
