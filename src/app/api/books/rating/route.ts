import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET() {
  const ratings = await prisma.$queryRaw`
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

  return NextResponse.json({ ratings })
}

export async function POST(request: Request) {
  const RatingBodySchema = z.object({
    description: z.string().min(1).max(450),
    rate: z.number(),
    bookId: z.string(),
    userId: z.string(),
  })

  const body = await request.json()

  const { bookId, description, rate, userId } = RatingBodySchema.parse(body)

  console.log(body)

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
