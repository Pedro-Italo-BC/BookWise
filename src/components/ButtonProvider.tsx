'use client'
import { signIn } from 'next-auth/react'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface ButtonProviderProps {
  children: ReactNode
  provider: 'github' | 'google' | 'visit'
}

export function ButtonProvider({ children, provider }: ButtonProviderProps) {
  const router = useRouter()

  function handleSignIn() {
    if (provider === 'visit') {
      router.push('/begin')
    } else {
      signIn(provider, {
        callbackUrl: `${window.location.origin}/begin`,
      })
    }
  }

  return (
    <button
      className="flex flex-1 gap-5 rounded-lg bg-gray-600 px-6 py-5 text-lg font-bold text-gray-200 transition duration-200 ease-in-out hover:brightness-125"
      onClick={handleSignIn}
    >
      {children}
    </button>
  )
}
