'use client'

import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
interface StarsRateProps {
  rate?: number
  isButton?: boolean
  rateNumberResponse?: number
  size?: number
}

export function StarsRate({
  rate = 0,
  rateNumberResponse,
  isButton = false,
  size = 16,
}: StarsRateProps) {
  const starsArray = [1, 2, 3, 4, 5]

  function handleStarClick(number: number) {
    console.log(number)
  }

  return !isButton ? (
    <div className="gap flex">
      {starsArray.map((star) => {
        return star <= rate ? (
          <AiFillStar size={size} color="#8381D9" />
        ) : (
          <AiOutlineStar size={size} color="#8381D9" />
        )
      })}
    </div>
  ) : (
    <div>
      {starsArray.map((_, index) => {
        return (
          <button key={index} onClick={() => handleStarClick(index + 1)}>
            <AiOutlineStar size={size} color="#8381D9" />
          </button>
        )
      })}
    </div>
  )
}
