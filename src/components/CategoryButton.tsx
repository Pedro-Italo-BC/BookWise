'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface CategoryButtonProps {
  category: string
}

export function CategoryButton({ category }: CategoryButtonProps) {
  const currentUrl = usePathname()

  const queryParams = useSearchParams().get('category')

  return (
    <Link
      href={currentUrl.concat(`?category=${category}`)}
      className={
        queryParams === category || (category === 'Tudo' && !queryParams)
          ? 'rounded-full bg-purple-200 px-4 py-1 text-base font-normal text-gray-100 transition duration-200 ease-in-out hover:brightness-150'
          : 'rounded-full border border-purple-100 bg-transparent px-4 py-1 text-base font-normal text-purple-100 transition duration-200 ease-in-out hover:brightness-150'
      }
    >
      {category}
    </Link>
  )
}
