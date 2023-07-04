import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query'],
})

export async function fetchCategories() {
  return await prisma.category.findMany()
}

export async function getFavoritesBooksQuery() {
  return await prisma.book.findMany({
    select: {
      id: true,
      name: true,
      author: true,
      cover_url: true,
      _count: {
        select: {
          ratings: true,
        },
      },
      ratings: {
        select: {
          rate: true,
        },
      },
    },
    orderBy: {
      ratings: {
        _count: 'desc',
      },
    },
    take: 4,
  })
}

export async function getRatingBookByBookId(bookId: string) {
  return await prisma.rating.findMany({
    where: {
      book_id: bookId,
    },
    select: {
      user: {
        select: {
          image: true,
          name: true,
        },
      },
      created_at: true,
      description: true,
      id: true,
      rate: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  })
}

export async function fetchUserRatingsByUserId(userId: string) {
  return await prisma.rating.findMany({
    where: {
      user_id: userId,
    },
    orderBy: {
      created_at: 'desc',
    },
    include: {
      book: true,
    },
  })
}

export async function fetchRatings() {
  return await prisma.$queryRaw`
  SELECT 
    r.created_at as rateCreatedAt,
    r.rate as rate,
    r.id as rateId,
    b.name as bookName,
    b.author as bookAuthor,
    b.summary as bookSummary,
    b.cover_url as bookCover,
    u.name as userName,
    u.image as userAvatar
  FROM ratings r
  INNER JOIN books b
    ON b.id = r.book_id 
  INNER JOIN users u
    ON u.id = r.user_id
  ORDER BY r.created_at DESC
`
}

export async function fetchBooks() {
  return await prisma.book.findMany({
    select: {
      id: true,
      name: true,
      author: true,
      cover_url: true,
      total_pages: true,
      categories: {
        select: {
          category: true,
        },
      },
      _count: {
        select: {
          ratings: true,
        },
      },
      ratings: {
        select: {
          rate: true,
        },
      },
    },
  })
}

export async function getUserMetricsByUserId(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      ratings: {
        include: {
          book: {
            include: {
              categories: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  })
}

export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
  })
}
