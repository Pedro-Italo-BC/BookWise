import { Categories } from '@/components/Categories'
import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { api } from '@/lib/axios'
import { GiBinoculars } from 'react-icons/gi'
import { BookList } from '@/components/BookList'

export default async function Explorer() {
  const booksRes = await api.get('/books')
  const booksData = booksRes.data.books

  return (
    <main className="w-full pb-12">
      <Header>
        <div className="flex items-center gap-3">
          <GiBinoculars color="#50B2C0" size={26} />
          <p className="text-2xl font-bold text-gray-100">Explorar</p>
        </div>
        <SearchBar />
      </Header>
      <main>
        <header className="mb-12">
          <Categories />
        </header>

        <BookList books={booksData} />
      </main>
    </main>
  )
}
