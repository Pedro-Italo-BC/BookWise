'use client'

import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
interface StarsRateProps {
  rate?: number
  isButton?: boolean
  rateNumberResponse?: number
}

export function StarsRate({
  rate = 0,
  rateNumberResponse,
  isButton = false,
}: StarsRateProps) {
  const starsArray = [1, 2, 3, 4, 5]

  console.log(starsArray)

  function handleStarClick(number: number) {
    console.log(number)
  }

  return !isButton ? (
    <div className="gap flex">
      {starsArray.map((star) => {
        return star <= rate ? (
          <AiFillStar size={16} color="#8381D9" />
        ) : (
          <AiOutlineStar size={16} color="#8381D9" />
        )
      })}
    </div>
  ) : (
    <div>
      {starsArray.map((_, index) => {
        return (
          <button key={index} onClick={() => handleStarClick(index + 1)}>
            <AiOutlineStar size={16} color="#8381D9" />
          </button>
        )
      })}
    </div>
  )
}
