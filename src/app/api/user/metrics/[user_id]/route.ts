import { getUserById, getUserMetricsByUserId } from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface RatingType {
  book: {
    id: string
    author: string
    categories: {
      category: {
        name: string
      }
    }[]
    total_pages: number
  }
}

export async function GET(
  req: Request,
  { params }: { params: { user_id: string } },
) {
  if (!params.user_id) {
    throw new Error('The user id is missing!')
  }

  const userInfoResponse = await getUserMetricsByUserId(params.user_id)

  const userResponse = await getUserById(params.user_id)

  if (!userResponse) {
    throw new Error('The user does not exist!')
  }

  const mainUserInfo = {
    name: userResponse.name,
    image: userResponse.image,
    createdAt: userResponse.createdAt,
  }

  function getNumberOfBooksAndAuthorsReaded(rating: RatingType[]) {
    function reduceFn(
      acc: { authors: string[]; books: string[] },
      cur: RatingType,
    ) {
      if (!acc.authors.includes(cur.book.author)) {
        acc.authors.push(cur.book.author)
      }
      if (!acc.books.includes(cur.book.id)) {
        acc.books.push(cur.book.id)
      }
      return acc
    }

    const booksAndAuthorsAmountReduce = rating.reduce(reduceFn, {
      authors: [],
      books: [],
    })

    const booksAndAuthorsAmount = {
      authors: booksAndAuthorsAmountReduce.authors.length,
      books: booksAndAuthorsAmountReduce.books.length,
    }

    return booksAndAuthorsAmount
  }

  function getTheFavoriteCategory(rating: RatingType[]) {
    function reduceFn(
      acc: { category: string; amount: number }[],
      cur: RatingType,
    ) {
      const matchCategoryArray = acc.filter((book) =>
        cur.book.categories.some(
          (category) => category.category.name === book.category,
        ),
      )

      if (matchCategoryArray.length > 0) {
        const updatedCategoryBookListAmount = matchCategoryArray.map(
          (bookItem) => ({
            ...bookItem,
            amount: bookItem.amount + 1,
          }),
        )

        return updatedCategoryBookListAmount
      } else {
        return cur.book.categories.map((categoryItem) => ({
          category: categoryItem.category.name,
          amount: 1,
        }))
      }
    }

    const favoritesCategoryArray = rating.reduce(reduceFn, [])

    return favoritesCategoryArray.sort((a, b) => a.amount - b.amount)[0]
      .category
  }

  if (!userInfoResponse) {
    return mainUserInfo
  }

  const bookAndAuthorLength = getNumberOfBooksAndAuthorsReaded(
    userInfoResponse.ratings,
  )

  const totalPages = userInfoResponse.ratings.reduce(
    (acc, cur) => acc + cur.book.total_pages,
    0,
  )

  const favoriteCategory = getTheFavoriteCategory(userInfoResponse.ratings)

  const userMetricsInfo = {
    ...mainUserInfo,
    readedBooks: bookAndAuthorLength.books,
    readedAuthors: bookAndAuthorLength.authors,
    totalPages,
    favoriteCategory,
  }

  console.log('💜💜💜💜💜 User Metrics Info 💜💜💜💜💜')
  console.log(userMetricsInfo)

  return NextResponse.json({ userMetricsInfo })
}
