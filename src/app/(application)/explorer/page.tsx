import { Categories } from '@/components/Categories'
import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { GiBinoculars } from 'react-icons/gi'

import { BookList } from '@/components/BookList'
import { fetchBooks } from '@/lib/prisma'

export const metadata = {
  title: 'Book Wise | Explorer',
  description: 'Página de exploração',
}

export default async function Explorer() {
  const booksData = await fetchBooks()

  return (
    <main className="w-full pb-12">
      <Header>
        <div className="flex items-center gap-3">
          <GiBinoculars color="#50B2C0" size={26} />
          <p className="text-2xl font-bold text-gray-100">Explorar</p>
        </div>
        <SearchBar placeholder="Buscar livro ou autor" />
      </Header>
      <main>
        <header className="mb-12">
          {/* @ts-expect-error Server Component */}
          <Categories />
        </header>

        <BookList books={booksData} />
      </main>
    </main>
  )
}
