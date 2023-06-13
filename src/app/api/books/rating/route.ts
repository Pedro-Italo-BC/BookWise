import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

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
