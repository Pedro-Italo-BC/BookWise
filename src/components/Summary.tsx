'use client'

import { limitString } from '@/utils/limitString'
import { useState } from 'react'
interface SummaryProps {
  summary: string
  length: number
}

export function Summary({ length, summary }: SummaryProps) {
  const [textLimited, setTextLimited] = useState(true)
  return textLimited === true && summary.length > length ? (
    <p className="w-[27rem] text-sm font-normal text-gray-300">
      {limitString(summary, length, true)}
      <button
        className="bg-none text-sm font-bold text-purple-100"
        onClick={() => setTextLimited((state) => !state)}
      >
        ver mais
      </button>
    </p>
  ) : (
    <p className="w-[27rem] text-sm font-normal text-gray-300">{summary}</p>
  )
}
