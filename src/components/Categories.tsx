import { api } from '@/lib/axios'
import { Category } from '@prisma/client'

import { CategoryButton } from './CategoryButton'

export async function Categories() {
  const categories = await api.get('/books/categories')
  const categoriesData: Category[] = categories.data.categories
  return (
    <nav className="flex flex-1 gap-3">
      <CategoryButton category="Tudo" />
      {categoriesData.map(({ id, name }) => {
        return <CategoryButton category={name} key={id} />
      })}
    </nav>
  )
}
