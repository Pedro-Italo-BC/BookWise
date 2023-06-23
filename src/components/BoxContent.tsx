'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface BoxContentProps {
  button?: {
    title: string | null
    type: 'link' | 'button'
    btnFn?: () => void
    link?: string
  } | null
  specificComponent?: ReactNode | null
  children: ReactNode
  title: string
}

export function BoxContent({
  title,
  children,
  button,
  specificComponent,
}: BoxContentProps) {
  return (
    <section className="flex w-full flex-col gap-4">
      <header className="flex w-full items-center justify-between">
        <h2 className="text-sm font-normal text-gray-100">{title}</h2>
        {specificComponent ||
          (button && button.btnFn !== null && button.title ? (
            button.type === 'button' ? (
              <button
                className="text-sm font-bold text-purple-100 transition duration-200 ease-in-out hover:brightness-150"
                onClick={button.btnFn && button.btnFn}
              >
                {button.title}
              </button>
            ) : (
              <Link
                href={button.link ?? '/'}
                className="text-sm font-bold text-purple-100 transition duration-200 ease-in-out hover:brightness-150"
                onClick={button.btnFn && button.btnFn}
              >
                {button.title}
              </Link>
            )
          ) : null)}
        {}
      </header>

      {children}
    </section>
  )
}
