'use client'
import * as Dialog from '@radix-ui/react-dialog'
import GoogleIcon from '../assets/GoogleIcon.svg'
import GithubIcon from '../assets/GithubIcon.svg'
import { ReactNode } from 'react'

import Image from 'next/image'
import { ButtonProvider } from './ButtonProvider'
import { RxCross2 } from 'react-icons/rx'

interface ProviderButtonDialogPorps {
  children: ReactNode
}

export function ProviderButtonDialog({ children }: ProviderButtonDialogPorps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/60" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[0.375rem] focus:outline-none">
          <div className="rounded-xl bg-gray-700 px-4 py-4 pb-14">
            <div className="flex w-[32.25rem] justify-end">
              <Dialog.Close asChild>
                <button className="bg-none">
                  <RxCross2 size={24} color="#8D95AF" />
                </button>
              </Dialog.Close>
            </div>
            <div className="flex flex-col items-center gap-10">
              <p className="text-base font-bold text-gray-200">
                Faça login para deixar sua avaliação
              </p>
              <div className="flex w-[23.25rem] flex-col gap-4">
                <ButtonProvider provider="google">
                  <Image
                    src={GoogleIcon}
                    alt="Google Icon"
                    height={32}
                    width={32}
                    draggable={false}
                  />
                  Entrar com Google
                </ButtonProvider>

                <ButtonProvider provider="github">
                  <Image
                    src={GithubIcon}
                    alt="Google Icon"
                    height={32}
                    width={32}
                    draggable={false}
                  />
                  Entrar com Github
                </ButtonProvider>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
