'use client'

import { BoxContent } from './BoxContent'
import { useQuery } from 'react-query'
import { api } from '@/lib/axios'
import { useState } from 'react'
import { StarsRate } from './StarsRate'
import { UserPicture } from './UserPicture'
import { getDateFrom } from '@/utils/getDateFrom'
import { useSession } from 'next-auth/react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { ProviderButtonDialog } from './ProviderButtonDialog'

interface BookRatingComponentProps {
  bookId: string
}

interface RatingResponseData {
  created_at: string | Date
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
  const [stars, setStars] = useState(0)
  const [hasFocus, setHasFocus] = useState(false)
  const [textAreaValue, setTextAreaValue] = useState('')
  const [isCommenting, setIsCommenting] = useState(false)
  const characterNumberLength = 450
  const userSession = useSession()

  function closeCommetingSection() {
    setStars(0)
    setTextAreaValue('')
    setIsCommenting(false)
  }

  async function makeBookRate() {
    if (textAreaValue) {
      const rateObject = {
        description: textAreaValue,
        rate: stars,
        bookId,
        userId: userSession.data?.user.id ?? '',
      }

      const ratingResponse = await api
        .post('/books/rating', rateObject)
        .then((res) => res.data.responseRatingData)
        .catch((err) => console.error(err))

      console.log(rateObject)
      console.log(ratings[0])

      setRatings((state) => [ratingResponse, ...state])

      closeCommetingSection()
    }
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
        btnFn: () =>
          userSession.status === 'authenticated' && setIsCommenting(true),
        type: 'button',
      }}
      specificComponent={
        userSession.status === 'authenticated' ? null : (
          <ProviderButtonDialog>
            <button className="text-sm font-bold text-purple-100 transition duration-200 ease-in-out hover:brightness-150">
              Avaliar
            </button>
          </ProviderButtonDialog>
        )
      }
    >
      <ul className="flex flex-col gap-3 pb-5">
        {isCommenting && (
          <div className="w-full rounded-lg bg-gray-700 p-6">
            <header className="flex justify-between pb-6">
              <div className="flex items-center gap-4">
                <UserPicture
                  size="size-md"
                  url={userSession.data?.user?.image ?? ''}
                />

                <p className="text-base font-bold text-gray-100">
                  {userSession.data?.user?.name ?? ''}
                </p>
              </div>

              <StarsRate
                isButton={true}
                rate={stars}
                setStars={setStars}
                size={28}
              />
            </header>
            <main>
              <div
                className={`flex h-[10.25rem] w-full flex-col border  bg-gray-800 ${
                  hasFocus ? 'border-green-200' : 'border-gray-500'
                }`}
              >
                <textarea
                  onChange={(value) => {
                    if (value.target.value.length <= characterNumberLength) {
                      setTextAreaValue(value.target.value)
                    }
                  }}
                  value={textAreaValue}
                  onFocus={() => setHasFocus(true)}
                  onBlur={() => setHasFocus(false)}
                  placeholder="Escreva sua avaliação"
                  className="w-full flex-1 resize-none bg-transparent px-5 py-4 text-sm font-normal text-gray-200 
                placeholder:text-sm
                placeholder:font-normal placeholder:text-gray-400 focus:outline-none"
                />
                <header className="flex justify-end px-2 py-1 ">
                  <span className="text-xs font-normal text-gray-400">
                    {textAreaValue.length}/{characterNumberLength}
                  </span>
                </header>
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button
                  className="rounded-md bg-gray-600 p-2 transition duration-200 ease-in-out hover:brightness-150"
                  onClick={() => closeCommetingSection()}
                >
                  <AiOutlineClose color="#8381D9" size={24} />
                </button>
                <button
                  className="rounded-md bg-gray-600 p-2 transition duration-200 ease-in-out hover:brightness-150"
                  onClick={makeBookRate}
                >
                  <AiOutlineCheck size={24} color="#50B2C0" />
                </button>
              </div>
            </main>
          </div>
        )}

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
