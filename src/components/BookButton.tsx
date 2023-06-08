import Image from 'next/image'
import { StarsRate } from './StarsRate'
import { limitString } from '@/utils/limitString'

interface BookButtoProps {
  type?: 'sm' | 'lg'
  img: string
  title: string
  author: string
  rate: number
}

export function BookButton({
  type = 'lg',
  author,
  img,
  title,
  rate,
}: BookButtoProps) {
  switch (type) {
    case 'lg':
      return (
        <main className="flex w-[318px] cursor-pointer gap-5 rounded-lg bg-gray-700 p-5 pl-6 transition duration-200 ease-in-out hover:bg-gray-600">
          <Image src={img} alt="Image do livro" width={108} height={152} />
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

    case 'sm':
      return (
        <main className="flex w-[324px] cursor-pointer gap-5 rounded-lg bg-gray-700 p-5 pl-6 transition duration-200 ease-in-out hover:bg-gray-600">
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
