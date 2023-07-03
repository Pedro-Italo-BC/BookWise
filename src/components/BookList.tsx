'use client'

import { getRatingMediaFunction } from '@/utils/getRatingMediaValue'
import { BookButton } from './BookButton'
import { useSearchParams } from 'next/navigation'
import { Category } from '@prisma/client'
import { filterBooks } from '@/utils/filterBooks'

interface bookResponseData {
  author: string
  cover_url: string
  id: string
  name: string
  ratings: {
    rate: number
  }[]
  categories: {
    category: Category
  }[]
  total_pages: number
  _count: {
    ratings: number
  }
}

interface BookListProps {
  books: bookResponseData[]
}

export function BookList({ books }: BookListProps) {
  const categorySeachParam = useSearchParams().get('category')
  const searchSeachParam = useSearchParams().get('search')

  const filteredBooks = filterBooks({
    contentValue: books,
    category: categorySeachParam,
    search: searchSeachParam,
    type: 'Q-book',
  }) as bookResponseData[]

  return (
    <ul className="grid w-full grid-cols-3 flex-wrap gap-5">
      {filteredBooks.map(
        ({
          author,
          cover_url,
          id,
          name,
          ratings,
          _count,
          categories,
          total_pages,
        }) => {
          return (
            <BookButton
              author={author}
              img={cover_url}
              rate={getRatingMediaFunction(ratings)}
              title={name}
              key={id}
              categories={categories}
              pagesNumber={total_pages}
              bookId={id}
              ratingAmount={_count.ratings}
              type="lg"
            />
          )
        },
      )}
    </ul>
  )
}
