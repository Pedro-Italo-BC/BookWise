import { ReactNode } from 'react'

interface ButtonProviderProps {
  children: ReactNode
  url?: string
}

export function ButtonProvider({ children, url }: ButtonProviderProps) {
  return (
    <button className="flex flex-1 gap-5 rounded-lg bg-gray-600 px-6 py-5 text-lg font-bold text-gray-200 transition duration-200 ease-in-out hover:brightness-125">
      {children}
    </button>
  )
}
