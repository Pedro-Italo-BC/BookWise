import { BoxContent } from '@/components/BoxContent'
import { Header } from '@/components/Header'
import { api } from '@/lib/axios'
import { AiOutlineLineChart } from 'react-icons/ai'
import { RatingBox } from '@/components/RatingBox'
import { BookButton } from '@/components/BookButton'
import { getRatingMediaFunction } from '@/utils/getRatingMediaValue'

interface RatingResponseType {
  rateCreatedAt: string
  rate: number
  rateId: string
  bookName: string
  bookAuthor: string
  bookSummary: string
  bookCover: string
  userName: string
  userAvatar: string
}

interface FavoritesBooksType {
  id: string
  name: string
  author: string
  cover_url: string
  ratings: {
    rate: number
  }[]
  _count: {
    ratings: number
  }
}

export default async function Begin() {
  const ratingResponse = await api.get('/books/rating')
  const ratingResponseData: RatingResponseType[] = ratingResponse.data.ratings

  const favoritesBooksResponse = await api.get('/books/favorites')

  const favoritesBooksData: FavoritesBooksType[] =
    favoritesBooksResponse.data.favoritesBooksQuery

  return (
    <main className="mx-auto">
      <Header>
        <div className="flex items-center gap-3">
          <AiOutlineLineChart color="#50B2C0" size={26} />
          <p className="text-2xl font-bold text-gray-100">Início</p>
        </div>
      </Header>

      <main className="flex gap-16">
        <div className="flex flex-col gap-10 pb-12">
          <BoxContent title="Avaliações mais recentes">
            {ratingResponseData.map((rateItem) => {
              return (
                <RatingBox
                  author={rateItem.bookAuthor}
                  bookName={rateItem.bookName}
                  coverUrl={rateItem.bookCover}
                  createdAt={rateItem.rateCreatedAt}
                  rate={rateItem.rate}
                  summary={rateItem.bookSummary}
                  userAvatar={rateItem.userAvatar}
                  userName={rateItem.userName}
                  key={rateItem.rateId}
                />
              )
            })}
          </BoxContent>
        </div>
        <div className="w-[324px]">
          <BoxContent title="Livros populares" seeAll={true}>
            {favoritesBooksData.map((bookItem) => {
              return (
                <BookButton
                  author={bookItem.author}
                  img={bookItem.cover_url}
                  rate={getRatingMediaFunction(bookItem.ratings)}
                  title={bookItem.name}
                  type="sm"
                  key={bookItem.id}
                />
              )
            })}
          </BoxContent>
        </div>
      </main>
    </main>
  )
}
