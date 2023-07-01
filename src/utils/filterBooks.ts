import { Book, Category, Rating } from '@prisma/client'

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

type RateType = Rating & {
  book: Book
}

interface FilterBooksProps {
  contentValue: bookResponseData[] | RateType[]
  category?: string | null
  search?: string | null
  type: 'Q-book' | 'Q-rate'
}

export function filterBooks({
  contentValue,
  category,
  search,
  type,
}: FilterBooksProps): bookResponseData[] | RateType[] {
  const switchFunction = {
    'Q-book': {
      fn: () => {
        let filteredBooks = [...(contentValue as bookResponseData[])]

        if (category && category !== 'Tudo') {
          filteredBooks = filteredBooks.filter((contentValue) => {
            const bookCategories = contentValue.categories.map(
              (categoryObj) => categoryObj.category.name,
            )
            return bookCategories.includes(category)
          })
        }

        if (search) {
          const lowerCaseSearch = search.toLowerCase()
          filteredBooks = filteredBooks.filter((contentValue) => {
            const lowerCaseName = contentValue.name.toLowerCase()
            const lowerCaseAuthor = contentValue.author.toLowerCase()
            return (
              lowerCaseName.includes(lowerCaseSearch) ||
              lowerCaseAuthor.includes(lowerCaseSearch)
            )
          })
        }

        return filteredBooks
      },
    },
    'Q-rate': {
      fn: () => {
        let filteredRates = [...(contentValue as RateType[])]

        if (search) {
          const lowerCaseSearch = search.toLowerCase()
          filteredRates = filteredRates.filter((contentValue) => {
            const lowerCaseName = contentValue.book.name.toLowerCase()
            const lowerCaseAuthor = contentValue.book.author.toLowerCase()
            return (
              lowerCaseName.includes(lowerCaseSearch) ||
              lowerCaseAuthor.includes(lowerCaseSearch)
            )
          })
        }

        return filteredRates
      },
    },
  }

  const filteredContent = switchFunction[type].fn()

  return filteredContent
}
