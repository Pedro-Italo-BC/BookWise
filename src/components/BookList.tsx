'use client'

import { getRatingMediaFunction } from '@/utils/getRatingMediaValue'
import { BookButton } from './BookButton'
import { useSearchParams } from 'next/navigation'
import { Category } from '@prisma/client'

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

  function filterBooks(
    booksValue: bookResponseData[],
    category: string | null,
    search: string | null,
  ): bookResponseData[] {
    let filteredBooks = [...booksValue]

    if (category && category !== 'Tudo') {
      filteredBooks = filteredBooks.filter((booksValue) => {
        const bookCategories = booksValue.categories.map(
          (categoryObj) => categoryObj.category.name,
        )
        return bookCategories.includes(category)
      })
    }

    if (search) {
      const lowerCaseSearch = search.toLowerCase()
      filteredBooks = filteredBooks.filter((booksValue) => {
        const lowerCaseName = booksValue.name.toLowerCase()
        const lowerCaseAuthor = booksValue.author.toLowerCase()
        return (
          lowerCaseName.includes(lowerCaseSearch) ||
          lowerCaseAuthor.includes(lowerCaseSearch)
        )
      })
    }

    return filteredBooks
  }

  const filteredBooks = filterBooks(books, categorySeachParam, searchSeachParam)

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
