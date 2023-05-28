'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface NavigationButtonProps {
  url: string
  children: ReactNode
}

export function NavigationButton({ url, children }: NavigationButtonProps) {
  const curreentUrl = usePathname()

  return (
    <Link
      className={
        url === curreentUrl
          ? 'relative flex items-center gap-3 pl-5 text-lg font-bold text-gray-100 transition duration-300 ease-in-out'
          : 'relative flex items-center gap-3 pl-5 text-base font-normal text-gray-400 transition duration-300 ease-in-out hover:text-gray-100'
      }
      href={url}
    >
      {url === curreentUrl && (
        <div className="absolute left-0 h-6 w-1 rounded-full bg-gradient-vertical" />
      )}

      {children}
    </Link>
  )
}
