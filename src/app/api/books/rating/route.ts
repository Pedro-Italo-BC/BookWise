import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(request: Request) {
  const RatingBodySchema = z.object({
    description: z.string().min(1).max(450),
    rate: z.number(),
    bookId: z.string(),
    userId: z.string(),
  })

  const body = await request.json()

  const { bookId, description, rate, userId } = RatingBodySchema.parse(body)

  const ratingPrismaResponse = await prisma.rating.create({
    data: {
      description,
      rate,
      book_id: bookId,
      user_id: userId,
    },
    include: {
      user: true,
    },
  })

  const responseRatingData = {
    created_at: ratingPrismaResponse.created_at,
    description: ratingPrismaResponse.description,
    id: ratingPrismaResponse.id,
    rate: ratingPrismaResponse.rate,
    user: {
      image: ratingPrismaResponse.user.image,
      name: ratingPrismaResponse.user.name,
    },
  }

  return NextResponse.json({ responseRatingData })
}
