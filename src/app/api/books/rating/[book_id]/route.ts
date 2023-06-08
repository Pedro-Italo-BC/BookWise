import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const bookId = searchParams.get('book_id')

  if (!bookId) {
    throw new Error('There is no book id.')
  }

  const ratings = await prisma.$queryRaw`
  SELECT 
    r.created_at as rateCreatedAt,
    r.rate as rate,
    r.id as rateId,
    u.name as userName,
    u.avatar_url as userAvatar
    r.description as rateDescription
  FROM ratings r
  INNER JOIN books b
    ON b.id = r.book_id 
  INNER JOIN users u
    ON u.id = r.user_id
  WHERE b.id = ${bookId}
  ORDER BY r.created_at DESC
`

  return NextResponse.json({ ratings })
}
