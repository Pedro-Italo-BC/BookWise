'use client'

import { BoxContent } from './BoxContent'
import { useQuery } from 'react-query'
import { api } from '@/lib/axios'
import { useState } from 'react'
import { StarsRate } from './StarsRate'
import { UserPicture } from './UserPicture'
import { getDateFrom } from '@/utils/getDateFrom'

interface BookRatingComponentProps {
  bookId: string
}

interface RatingResponseData {
  created_at: string
  description: string
  id: string
  rate: number
  user: {
    image: string
    name: string
  }
}

export function BookRatingComponent({ bookId }: BookRatingComponentProps) {
  const [ratings, setRatings] = useState<RatingResponseData[]>([])

  function handleMakeBookRate() {
    console.log('click')
  }

  async function fetchRatingsData() {
    try {
      const ratingsResponse = await api.get(`/books/rating/${bookId}`)

      const ratingsResponseData = ratingsResponse.data.ratings

      setRatings(ratingsResponseData)

      console.log(ratingsResponse)
    } catch (err) {
      console.error(err)
    }
  }

  useQuery('ratings', fetchRatingsData)

  return (
    <BoxContent
      title="Avaliações"
      button={{
        title: 'Avaliar',
        btnFn: () => handleMakeBookRate,
        type: 'button',
      }}
    >
      <ul className="flex flex-col gap-3 pb-5">
        {ratings.map((rate) => {
          const dateFrom = getDateFrom(rate.created_at)

          return (
            <div key={rate.id} className="w-full rounded-lg bg-gray-700 p-6">
              <header className="flex justify-between">
                <div className="flex gap-4">
                  <UserPicture size="size-md" url={rate.user.image} />
                  <div>
                    <p className="text-base font-bold text-gray-100">
                      {rate.user.name}
                    </p>
                    <span className="text-sm font-normal text-gray-400">
                      {dateFrom}
                    </span>
                  </div>
                </div>

                <StarsRate isButton={false} rate={rate.rate} />
              </header>
              <p className="mt-5 text-sm font-normal text-gray-300">
                {rate.description}
              </p>
            </div>
          )
        })}
      </ul>
    </BoxContent>
  )
}
