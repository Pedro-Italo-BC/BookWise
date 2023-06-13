'use client'

import { useState } from 'react'
import { BoxContent } from './BoxContent'

export function RatingsSection() {
  const [onTimping, setOnTiping] = useState(false)

  return (
    <BoxContent
      title="Avaliações"
      button={{
        type: 'button',
        title: !onTimping ? 'Avaliar' : null,
        btnFn: () => {
          setOnTiping(true)
        },
      }}
    ></BoxContent>
  )
}
