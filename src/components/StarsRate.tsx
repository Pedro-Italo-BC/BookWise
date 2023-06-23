'use client'

import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Dispatch, SetStateAction, useState } from 'react'

interface StarsRateProps {
  rate?: number
  isButton?: boolean
  setStars?: Dispatch<SetStateAction<number>>
  size?: number
}

export function StarsRate({
  rate = 0,
  setStars = () => {},
  isButton = false,
  size = 16,
}: StarsRateProps) {
  const starsArray = [1, 2, 3, 4, 5]

  const [currentStars, setCurrentStars] = useState(0)

  function handleStarClick(number: number) {
    if (isButton === true) {
      const starsNumber = number === currentStars ? number - 1 : number

      setCurrentStars(starsNumber)
      console.log(starsNumber)
      setStars(starsNumber)
    }
  }

  return !isButton ? (
    <div className="gap flex">
      {starsArray.map((star) => {
        return star <= rate ? (
          <AiFillStar key={star} size={size} color="#8381D9" />
        ) : (
          <AiOutlineStar key={star} size={size} color="#8381D9" />
        )
      })}
    </div>
  ) : (
    <div>
      {starsArray.map((_, index) => {
        return (
          <button key={index} onClick={() => handleStarClick(index + 1)}>
            {index + 1 <= currentStars ? (
              <AiFillStar size={size} color="#8381D9" />
            ) : (
              <AiOutlineStar size={size} color="#8381D9" />
            )}
          </button>
        )
      })}
    </div>
  )
}
