import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { user_id: string } },
) {
  if (!params.user_id) {
    throw new Error('The user id is missing.')
  }

  const userRatingsList = await prisma.rating.findMany({
    where: {
      user_id: params.user_id,
    },
    orderBy: {
      created_at: 'desc',
    },
    include: {
      book: true,
    },
  })

  console.log(userRatingsList)

  return NextResponse.json({ userRatingsList })
}
