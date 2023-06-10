import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const books = await prisma.book.findMany({
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

  console.log(books[0].categories)

  return NextResponse.json({ books })
}
