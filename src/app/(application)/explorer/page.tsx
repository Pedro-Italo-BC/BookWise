'use client'

import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { GiBinoculars } from 'react-icons/gi'

export default function Explorer() {
  return (
    <main className="w-full">
      <Header>
        <div className="flex items-center gap-3">
          <GiBinoculars color="#50B2C0" size={26} />
          <p className="text-2xl font-bold text-gray-100">Explorar</p>
        </div>
        <SearchBar />
      </Header>
    </main>
  )
}
