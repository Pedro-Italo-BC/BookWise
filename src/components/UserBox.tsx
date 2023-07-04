'use client'

import { BiBookOpen } from 'react-icons/bi'
import { ImBooks } from 'react-icons/im'
import { CgUserList } from 'react-icons/cg'
import { BsBookmark } from 'react-icons/bs'
import { UserPicture } from './UserPicture'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/axios'
import { useQuery } from 'react-query'
import { useState } from 'react'
import { getYearOfDate } from '@/utils/getYearOfDate'
import { Fallback } from './Fallback'

interface FetchUserMetricsDataResponseType {
  name: string | null
  createdAt: Date
  image: string | null
  readedBooks: number
  readedAuthors: number
  totalPages: number
  favoriteCategory: string
}

export function UserBox() {
  const [userMetrics, setUserMetrics] =
    useState<FetchUserMetricsDataResponseType | null>(null)

  const session = useSession()

  async function fetchUserMetricsData() {
    try {
      const ratingsResponse = await api
        .get(`/user/metrics/${session.data?.user.id}`)
        .then((res) => res.data.userMetricsInfo)
        .catch((err) => console.error(err))

      setUserMetrics(ratingsResponse)
    } catch (err) {
      console.error(err)
    }
  }

  const { isLoading } = useQuery('userMetricsInfo', fetchUserMetricsData)

  return (
    <div className="flex flex-col items-center gap-10 border-l border-gray-700 px-14">
      {isLoading ? (
        <Fallback />
      ) : (
        <>
          <header className="flex flex-col items-center gap-5">
            <UserPicture size="size-lg" url={session.data?.user.image ?? ''} />
            <div>
              <h1 className="text-center text-xl font-bold text-gray-100">
                {session.data?.user.name}
              </h1>
              <p className="text-center text-sm font-normal text-gray-400">
                {`membro desde ${
                  userMetrics ? getYearOfDate(userMetrics.createdAt) : 'nunca'
                }`}
              </p>
            </div>
          </header>

          <div />

          <div>
            <ul className="flex flex-col gap-10">
              <li className="flex items-center gap-5">
                <BiBookOpen size={32} color="#50B2C0" />
                <div>
                  <p className="text-base font-bold text-gray-200">
                    {userMetrics?.totalPages ?? 0}
                  </p>
                  <span className="text-sm font-normal text-gray-300">
                    Páginas lidas
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-5">
                <ImBooks size={32} color="#50B2C0" />
                <div>
                  <p className="text-base font-bold text-gray-200">
                    {userMetrics?.readedBooks ?? 0}
                  </p>
                  <span className="text-sm font-normal text-gray-300">
                    Livros avaliados
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-5">
                <CgUserList size={32} color="#50B2C0" />
                <div>
                  <p className="text-base font-bold text-gray-200">
                    {userMetrics?.readedAuthors ?? 0}
                  </p>
                  <span className="text-sm font-normal text-gray-300">
                    Autores lidos
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-5">
                <BsBookmark size={32} color="#50B2C0" />
                <div>
                  <p className="text-base font-bold text-gray-200">
                    {userMetrics?.favoriteCategory
                      ? userMetrics?.favoriteCategory
                      : 'Nenhum'}
                  </p>
                  <span className="text-sm font-normal text-gray-300">
                    Categoria mais lida
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
