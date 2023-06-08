import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const favoritesBooksQuery = await prisma.book.findMany({
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

  return NextResponse.json({ favoritesBooksQuery })
}
