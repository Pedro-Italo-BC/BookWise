'use client'

import { useEffect, useState } from 'react'
import { Rating, Book } from '@prisma/client'
import { getDateFrom } from '@/utils/getDateFrom'
import { StarsRate } from '@/components/StarsRate'
import Image from 'next/image'
import { BoxContent } from '@/components/BoxContent'
import { api } from '@/lib/axios'
import { useQuery } from 'react-query'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { filterBooks } from '@/utils/filterBooks'

export function RatingList() {
  type RateType = Rating & {
    book: Book
  }
  const [rateList, setRateList] = useState<RateType[]>([])
  const [filteredRateList, setFilteredRateList] = useState<RateType[]>([])

  const session = useSession()
  const searchSeachParam = useSearchParams().get('search')
  async function fetchUserRatingList() {
    try {
      console.log(session.data?.user.id)

      const ratingsResponse = await api
        .get(`/books/rating/user-rates/${session.data?.user.id}`)
        .then((res) => res.data.userRatingsList)
        .catch((err) => console.error(err))

      setRateList(ratingsResponse)
    } catch (err) {
      console.error(err)
    }
  }

  useQuery('userRatings', fetchUserRatingList)

  useEffect(() => {
    if (searchSeachParam && !!rateList) {
      const filteredRateList = filterBooks({
        contentValue: rateList,
        type: 'Q-rate',
        search: searchSeachParam,
      })

      setFilteredRateList(filteredRateList as RateType[])
    } else {
      setFilteredRateList(rateList)
    }
  }, [searchSeachParam, rateList])

  return (
    <ul className="mt-10 flex w-full flex-col gap-6 pb-10">
      {filteredRateList.map((rateItem) => {
        return (
          <BoxContent
            key={rateItem.id}
            title={getDateFrom(rateItem.created_at)}
          >
            <div className="flex w-full flex-col gap-6 rounded-lg bg-gray-700 p-6 transition duration-200 ease-in-out hover:bg-gray-600">
              <div className="flex gap-6">
                <Image
                  src={rateItem.book.cover_url}
                  width={98}
                  height={134}
                  alt={`Imagem do livro ${rateItem.book.name}`}
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-100">
                      {rateItem.book.name}
                    </h2>
                    <p className="text-sm font-normal text-gray-400">
                      {rateItem.book.author}
                    </p>
                  </div>
                  <StarsRate rate={rateItem.rate} />
                </div>
              </div>
              <p>{rateItem.description}</p>
            </div>
          </BoxContent>
        )
      })}
    </ul>
  )
}
