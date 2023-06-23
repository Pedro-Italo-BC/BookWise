import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { book_id: string } },
) {
  if (!params.book_id) {
    throw new Error('There is no book id.')
  }

  const ratings = await prisma.rating.findMany({
    where: {
      book_id: params.book_id,
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

  return NextResponse.json({ ratings })
}
