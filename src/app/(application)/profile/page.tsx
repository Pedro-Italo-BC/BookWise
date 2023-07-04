'use client'

import { Header } from '@/components/Header'
import { RatingList } from '@/components/RatingList'
import { SearchBar } from '@/components/SearchBar'
import { AiOutlineUser, AiOutlineLeft } from 'react-icons/ai'
import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { UserBox } from '@/components/UserBox'
import { Fallback } from '@/components/Fallback'

export default function Profile() {
  const router = useRouter()
  const searchSeachParam = useSearchParams().get('search')
  const session = useSession()

  if (session.status === 'unauthenticated') {
    router.push('/')
  }

  return (
    <main>
      <Header>
        {!searchSeachParam ? (
          <div className="flex items-center gap-3">
            <AiOutlineUser color="#50B2C0" size={26} />
            <p className="text-2xl font-bold text-gray-100">Perfil</p>
          </div>
        ) : (
          <button
            onClick={() => router.push('/profile')}
            className="flex items-center gap-3 text-base font-bold text-gray-200"
          >
            <AiOutlineLeft size={20} color="#E6E8F2" /> voltar
          </button>
        )}
      </Header>
      {session.status === 'authenticated' ? (
        <div className="flex gap-16">
          <div className="w-[39rem]">
            <SearchBar
              placeholder="Buscar livro avaliado"
              searchWidth="W-full"
            />
            <Suspense fallback={<Fallback />}>
              <RatingList />
            </Suspense>
          </div>

          <div>
            <Suspense fallback={<Fallback />}>
              <UserBox />
            </Suspense>
          </div>
        </div>
      ) : (
        <Fallback />
      )}
    </main>
  )
}
