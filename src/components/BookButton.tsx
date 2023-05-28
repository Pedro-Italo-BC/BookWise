import Image from 'next/image'

import BookImg from '../assets/Book.png'

interface BookButtoProps {
  type?: 'sm' | 'md' | 'lg'
  img: string
  title: string
  author: string
  stars: number
  description?: string
  time?: string
}

export function BookButton({ type = 'lg' }: BookButtoProps) {
  switch (type) {
    case 'lg':
      return (
        <main className="flex w-[608px] cursor-pointer gap-6 rounded-lg bg-gray-700 p-5 pl-6 transition duration-200 ease-in-out hover:bg-gray-600">
          <Image src={BookImg} alt="Image do livro" width={108} height={152} />
          <div className="flex flex-col">
            <header className="flex items-center justify-between">
              <span className="text-sm font-normal text-gray-300">
                Há 2 dias
              </span>
              <div>5 estrelas</div>
            </header>
            <div className="mt-3">
              <h3 className="text-base font-bold text-gray-100">
                Entendendo Algoritmos
              </h3>
              <p className="text-sm font-normal text-gray-400">
                Aditya Bhargava
              </p>
            </div>
            <p className="mt-6 text-sm font-normal text-gray-300">
              Nec tempor nunc in egestas. Euismod nisi eleifend at et in
              sagittis. Penatibus id vestibulum imperdiet a at imperdiet
              lectu...
            </p>
          </div>
        </main>
      )

    case 'md':
      return (
        <main className="flex w-[318px] cursor-pointer gap-5 rounded-lg bg-gray-700 p-5 pl-6 transition duration-200 ease-in-out hover:bg-gray-600">
          <Image src={BookImg} alt="Image do livro" width={108} height={152} />
          <div className="flex flex-col justify-between">
            <header>
              <h3 className="text-base font-bold text-gray-100">
                Entendendo Algoritmos
              </h3>
              <p className="text-sm font-normal text-gray-400">
                Aditya Bhargava
              </p>
            </header>

            <div>
              <p>5 estrelas</p>
            </div>
          </div>
        </main>
      )

    case 'sm':
      return (
        <main className="flex w-[324px] cursor-pointer gap-5 rounded-lg bg-gray-700 p-5 pl-6 transition duration-200 ease-in-out hover:bg-gray-600">
          <Image src={BookImg} alt="Image do livro" width={64} height={94} />
          <div className="flex flex-col justify-between">
            <header>
              <h3 className="text-base font-bold text-gray-100">
                Entendendo Algoritmos
              </h3>
              <p className="text-sm font-normal text-gray-400">
                Aditya Bhargava
              </p>
            </header>

            <div>
              <p>5 estrelas</p>
            </div>
          </div>
        </main>
      )
  }
}
