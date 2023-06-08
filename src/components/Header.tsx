import { ReactNode } from 'react'

interface HeaderProps {
  children: ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="flex w-full flex-1 items-center justify-between py-14">
      {children}
    </header>
  )
}
