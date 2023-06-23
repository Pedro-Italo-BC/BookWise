'use client'

import Image from 'next/image'
import { StarsRate } from './StarsRate'
import { limitString } from '@/utils/limitString'
import * as Dialog from '@radix-ui/react-dialog'
import { BookDialog } from './BookDialog'
import { RxCross2 } from 'react-icons/rx'
import { Category } from '@prisma/client'
import { Suspense } from 'react'

interface BookButtoProps {
  type?: 'sm' | 'lg'
  img: string
  title: string
  author: string
  rate: number
  ratingAmount: number
  pagesNumber: number
  categories: { category: Category }[]
  bookId: string
}

export function BookButton({
  type = 'lg',
  author,
  img,
  title,
  rate,
  ratingAmount,
  categories,
  pagesNumber,
  bookId,
}: BookButtoProps) {
  switch (type) {
    case 'lg':
      return (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="flex min-w-[19.875rem] cursor-pointer gap-5 rounded-lg bg-gray-700 p-5 pl-6 transition duration-200 ease-in-out hover:bg-gray-600">
              <Image
                src={img}
                alt="Image do livro"
                width={108}
                height={152}
                draggable={false}
              />
              <div className="flex h-full flex-col justify-between">
                <header className="w-[9.375rem] text-left">
                  <h3 className="text-base font-bold text-gray-100">
                    {limitString(title, 26, true)}
                  </h3>
                  <p className="text-sm font-normal text-gray-400">{author}</p>
                </header>

                <div>
                  <StarsRate rate={rate} />
                </div>
              </div>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/60" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed right-[0] top-[0] h-screen w-[41.25rem] overflow-auto bg-gray-800 px-12 focus:outline-none">
              <div className="flex justify-end pb-4 pt-6">
                <Dialog.Close asChild>
                  <button className="bg-none">
                    <RxCross2 size={24} color="#8D95AF" />
                  </button>
                </Dialog.Close>
              </div>

              <Suspense>
                <BookDialog
                  author={author}
                  categories={categories}
                  coverUrl={img}
                  id={bookId}
                  name={title}
                  pagesNumber={pagesNumber}
                  rate={rate}
                  ratingAmount={ratingAmount}
                />
              </Suspense>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )

    case 'sm':
      return (
        <main className="flex w-[20.25rem] cursor-pointer gap-5 rounded-lg bg-gray-700 p-5 pl-6 transition duration-200 ease-in-out hover:bg-gray-600">
          <Image src={img} alt="Image do livro" width={64} height={94} />
          <div className="flex flex-col justify-between">
            <header>
              <h3 className="text-base font-bold text-gray-100">
                {limitString(title, 26, true)}
              </h3>
              <p className="text-sm font-normal text-gray-400">{author}</p>
            </header>

            <div>
              <StarsRate rate={rate} />
            </div>
          </div>
        </main>
      )
  }
}
