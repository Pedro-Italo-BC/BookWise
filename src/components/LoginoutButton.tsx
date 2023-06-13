'use client'

import { UserPicture } from './UserPicture'

import { FiLogOut, FiLogIn } from 'react-icons/fi'

import { signOut, useSession } from 'next-auth/react'
import { ProviderButtonDialog } from './ProviderButtonDialog'

export function LoginoutButton() {
  const session = useSession()

  return session.status === 'authenticated' ? (
    <button
      className="flex items-center gap-3"
      onClick={() => signOut({ callbackUrl: `${window.location.origin}` })}
    >
      <UserPicture url={session.data.user?.image as string} size="size-sm" />
      <p>{session.data.user?.name as string}</p>
      <FiLogOut color="#F75A68" size={20} />
    </button>
  ) : (
    <ProviderButtonDialog>
      <button
        disabled={session.status === 'loading'}
        className={`flex items-center gap-3 ${
          session.status === 'loading' && 'cursor-not-allowed brightness-50'
        }`}
      >
        <p>Fazer Login</p>
        <FiLogIn color="#50B2C0" size={20} />
      </button>
    </ProviderButtonDialog>
  )
}
