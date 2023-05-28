import { ReactNode } from 'react'

import bkLogo from '../../assets/BookWiseLogo.svg'
import Image from 'next/image'
import { NavigationButton } from '@/components/NavigationButton'

import { AiOutlineLineChart, AiOutlineUser } from 'react-icons/ai'

import { GiBinoculars } from 'react-icons/gi'
import { LoginoutButton } from '@/components/LoginoutButton'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen gap-24 py-6 pl-5 pr-24">
      <aside className="flex h-[900px] w-[232px] flex-col items-center justify-between rounded-xl bg-gray-700 pb-6 pt-10">
        <div className="flex flex-col gap-16">
          <Image src={bkLogo} alt="book wise logo" />

          <nav className="flex flex-col gap-4">
            <NavigationButton url="/begin">
              <AiOutlineLineChart size={24} /> Início
            </NavigationButton>

            <NavigationButton url="/explorer">
              <GiBinoculars size={24} /> Explorar
            </NavigationButton>

            <NavigationButton url="/profile">
              {' '}
              <AiOutlineUser size={24} />
              Perfil
            </NavigationButton>
          </nav>
        </div>

        <LoginoutButton />
      </aside>
      {children}
    </div>
  )
}