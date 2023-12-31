import { ReactNode } from 'react'
import './globals.css'
import { Nunito } from 'next/font/google'
import { Provider } from '@/components/Provider'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Book Wise',
  description: 'Um sistema de avaliação de livros',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-gray-800 text-gray-100`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
