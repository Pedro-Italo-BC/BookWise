import Image from 'next/image'

import MainImg from '../assets/MainImageHome.png'
import GoogleIcon from '../assets/GoogleIcon.svg'
import GithubIcon from '../assets/GithubIcon.svg'

import { RxRocket } from 'react-icons/rx'

import { ButtonProvider } from '@/components/ButtonProvider'

export default function Home() {
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

      <div className="mx-auto flex w-[372px] flex-col gap-10">
        <header>
          <h1 className="text-2xl font-bold">Boas vindas!</h1>
          <p className="text-base font-normal text-gray-200">
            Faça seu login ou acesse como visitante.
          </p>
        </header>
        <main className="flex w-full flex-col gap-4">
          <ButtonProvider>
            <Image
              src={GoogleIcon}
              alt="Google Icon"
              height={32}
              width={32}
              draggable={false}
            />{' '}
            Entrar com Google
          </ButtonProvider>

          <ButtonProvider>
            <Image
              src={GithubIcon}
              alt="Google Icon"
              height={32}
              width={32}
              draggable={false}
            />{' '}
            Entrar com Github
          </ButtonProvider>

          <ButtonProvider>
            <RxRocket className="text-purple-100" size={32} />
            Acessar como visitante
          </ButtonProvider>
        </main>
      </div>
    </main>
  )
}
