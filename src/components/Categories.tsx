import { Category } from '@prisma/client'

import { CategoryButton } from './CategoryButton'
import { fetchCategories } from '@/lib/prisma'

export async function Categories() {
  const categoriesData: Category[] = await fetchCategories()
  return (
    <nav className="flex flex-1 gap-3">
      <CategoryButton category="Tudo" />
      {categoriesData.map(({ id, name }) => {
        return <CategoryButton category={name} key={id} />
      })}
    </nav>
  )
}
