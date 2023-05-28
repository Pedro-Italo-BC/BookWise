import Link from 'next/link'
import { ReactNode } from 'react'

interface BoxContentProps {
  seeAll?: boolean
  children: ReactNode
  title: string
}

export function BoxContent({
  title,
  children,
  seeAll = false,
}: BoxContentProps) {
  return (
    <section className="flex w-full flex-col gap-4">
      <header className="flex w-full items-center justify-between">
        <h2 className="text-sm font-normal text-gray-100">{title}</h2>

        {seeAll && (
          <Link
            className="text-sm font-bold text-purple-100 transition duration-200 ease-in-out hover:brightness-150"
            href="/explorer"
          >
            Ver tudo {'>'}
          </Link>
        )}
      </header>

      {children}
    </section>
  )
}
