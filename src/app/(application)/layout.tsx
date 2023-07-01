import { ReactNode, Suspense } from 'react'

import bkLogo from '../../assets/BookWiseLogo.svg'
import Image from 'next/image'

import { LoginoutButton } from '@/components/LoginoutButton'

import { NavigationButtonList } from '@/components/NavigationButtonList'
import { Fallback } from '@/components/Fallback'

export const metadata = {
  title: 'Book Wise | Login',
  description: 'Login Page',
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen gap-24 py-6 pl-5 pr-24">
      <aside className="aside-bg fixed z-0 flex h-[92%] max-h-[900px] min-w-[232px] flex-col items-center justify-between rounded-xl  bg-gray-700 bg-no-repeat pb-6 pt-10">
        <div className="flex flex-col gap-16">
          <Image src={bkLogo} alt="book wise logo" />

          <NavigationButtonList />
        </div>

        <LoginoutButton />
      </aside>
      <div className="ml-[20.5rem] flex-1">
        <Suspense fallback={<Fallback />}>{children}</Suspense>
      </div>
    </div>
  )
}
