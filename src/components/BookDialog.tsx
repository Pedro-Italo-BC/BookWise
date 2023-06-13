import { Category } from '@prisma/client'
import Image from 'next/image'
import { StarsRate } from './StarsRate'

import { FaRegBookmark } from 'react-icons/fa'
import { GoBook } from 'react-icons/go'
import { BookRatingComponent } from './BookRatingComponent'

interface BookDialogProps {
  id: string
  name: string
  author: string
  coverUrl: string
  rate: number
  categories: {
    category: Category
  }[]
  pagesNumber: number
  ratingAmount: number
}

export async function BookDialog({
  author,
  categories,
  coverUrl,
  id,
  name,
  pagesNumber,
  rate,
  ratingAmount,
}: BookDialogProps) {
  return (
    <section className="flex flex-col gap-10">
      <main className="flex w-full flex-col gap-6 rounded-xl bg-gray-700 px-8 py-6">
        <div className="flex gap-8 border-b border-gray-600 pb-10">
          <Image
            src={coverUrl}
            width={171}
            height={242}
            className="h-[15.125rem] w-[10.6875rem]"
            alt={'livro ' + name}
          />
          <div className="flex h-[15.125rem] flex-col justify-between">
            <header>
              <h2 className="mb-2 text-lg font-bold text-gray-100">{name}</h2>
              <p className="text-base font-normal text-gray-300">{author}</p>
            </header>
            <footer>
              <StarsRate isButton={false} rate={rate} size={20} />
              <span className="text-sm font-normal text-gray-400">
                {ratingAmount !== 1
                  ? ratingAmount + ' avaliações'
                  : ratingAmount + ' avaliação'}
              </span>
            </footer>
          </div>
        </div>
        <footer className="flex items-center gap-14">
          <div className="flex w-[13.6875rem] items-center gap-4">
            <FaRegBookmark size={24} color="#50B2C0" />
            <div>
              <p className="text-sm font-normal text-gray-300">Categoria</p>
              <span className="text-base font-bold text-gray-200">
                {categories.reduce((acc, cur, curIdx, array) => {
                  return `${acc} ${
                    curIdx + 1 >= array.length
                      ? cur.category.name
                      : cur.category.name + ','
                  }`
                }, '')}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <GoBook size={24} color="#50B2C0" />
            <div>
              <p className="text-sm font-normal text-gray-300">Páginas</p>{' '}
              <span className="text-base font-bold text-gray-200">
                {pagesNumber}
              </span>
            </div>
          </div>
        </footer>
      </main>
      <BookRatingComponent bookId={id} />
    </section>
  )
}
