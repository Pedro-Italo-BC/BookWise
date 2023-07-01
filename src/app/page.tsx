'use client'

import Image from 'next/image'

import MainImg from '../assets/MainImageHome.png'
import GoogleIcon from '../assets/GoogleIcon.svg'
import GithubIcon from '../assets/GithubIcon.svg'

import { RxRocket } from 'react-icons/rx'

import { ButtonProvider } from '@/components/ButtonProvider'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const session = useSession()
  const router = useRouter()

  if (session.status === 'authenticated') {
    router.push('/begin')
  }

  return (
    <main className="flex h-screen items-center p-5">
      <Image
        src={MainImg}
        alt="BookWise Imagem ilustrativa"
        quality={100}
        priority
        width={598}
        height={912}
        draggable={false}
      />

      <div className="mx-auto flex w-[23.25rem] flex-col gap-10">
        <header>
          <h1 className="text-2xl font-bold">Boas vindas!</h1>
          <p className="text-base font-normal text-gray-200">
            Faça seu login ou acesse como visitante.
          </p>
        </header>
        <main className="flex w-full flex-col gap-4">
          <ButtonProvider provider="google" sessionStatus={session.status}>
            <Image
              src={GoogleIcon}
              alt="Google Icon"
              height={32}
              width={32}
              draggable={false}
            />{' '}
            Entrar com Google
          </ButtonProvider>

          <ButtonProvider provider="github" sessionStatus={session.status}>
            <Image
              src={GithubIcon}
              alt="Google Icon"
              height={32}
              width={32}
              draggable={false}
            />{' '}
            Entrar com Github
          </ButtonProvider>

          <ButtonProvider provider="visit" sessionStatus={session.status}>
            <RxRocket className="text-purple-100" size={32} />
            Acessar como visitante
          </ButtonProvider>
        </main>
      </div>
    </main>
  )
}
