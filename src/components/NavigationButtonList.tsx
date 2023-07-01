'use client'

import { NavigationButton } from '@/components/NavigationButton'
import { AiOutlineLineChart, AiOutlineUser } from 'react-icons/ai'
import { GiBinoculars } from 'react-icons/gi'
import { useSession } from 'next-auth/react'

export function NavigationButtonList() {
  const session = useSession()

  return (
    <nav className="flex flex-col gap-4">
      <NavigationButton url="/begin">
        <AiOutlineLineChart size={24} /> Início
      </NavigationButton>

      <NavigationButton url="/explorer">
        <GiBinoculars size={24} /> Explorar
      </NavigationButton>

      {session.status === 'authenticated' && (
        <NavigationButton url="/profile">
          {' '}
          <AiOutlineUser size={24} />
          Perfil
        </NavigationButton>
      )}
    </nav>
  )
}
