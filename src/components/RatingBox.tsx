import Image from 'next/image'
import { UserPicture } from './UserPicture'
import { StarsRate } from './StarsRate'
import { getDateFrom } from '@/utils/getDateFrom'
import { Summary } from './Summary'

interface RatingBoxProps {
  rate: number
  summary: string
  createdAt: string
  userName: string
  coverUrl: string
  bookName: string
  author: string
  userAvatar: string
  hasHeader?: boolean
}

export function RatingBox({
  author,
  coverUrl,
  createdAt,
  summary,
  bookName,
  rate,
  userAvatar,
  userName,
  hasHeader = true,
}: RatingBoxProps) {
  return (
    <div className="flex w-[38rem] cursor-pointer flex-col gap-8 rounded-lg bg-gray-700 p-5 pl-6 transition duration-200 ease-in-out hover:bg-gray-600">
      {hasHeader && (
        <header className="flex justify-between">
          <div className="flex gap-4">
            <UserPicture url={userAvatar} size="size-md" />
            <div>
              <h3 className="text-base font-normal text-gray-100">
                {userName}
              </h3>
              <span className="text-sm font-normal text-gray-400">
                {getDateFrom(createdAt)}
              </span>
            </div>
          </div>
          <StarsRate rate={rate} />
        </header>
      )}
      <main className="flex gap-5">
        <div className="h-max-[152px] max-w-[108px]">
          <Image
            src={coverUrl}
            alt="Image do livro"
            width={108}
            height={152}
            className="h-max-[152px] max-w-[108px]"
          />
        </div>
        <div className="flex flex-col gap-3">
          {!hasHeader && (
            <header className="flex items-center justify-between">
              <span className="text-sm font-normal text-gray-300">
                {getDateFrom(createdAt)}
              </span>
              <StarsRate rate={rate} />
            </header>
          )}

          <div className="mb-5 flex flex-col">
            <h3 className="text-base font-bold text-gray-100">{bookName}</h3>
            <p className="text-sm font-normal text-gray-400">{author}</p>
          </div>
          <Summary length={210} summary={summary} />
        </div>
      </main>
    </div>
  )
}
