import { UserPicture } from './UserPicture'

import { FiLogOut, FiLogIn } from 'react-icons/fi'

import exampleImg from '../assets/aa.jpg'

interface LogininoutButtonProps {
  name: string
  profileUrl: string
}

function ButtonLoged({ name, profileUrl }: LogininoutButtonProps) {
  return (
    <button className="flex items-center gap-3">
      <UserPicture url={profileUrl} size="size-sm" />
      <p>Cristofer</p>
      <FiLogOut color="#F75A68" size={20} />
    </button>
  )
}

function ButtonNotLoged() {
  return (
    <button className="flex items-center gap-3">
      <p>Fazer Login</p>
      <FiLogIn color="#50B2C0" size={20} />
    </button>
  )
}

export function LoginoutButton() {
  const isLoged = false

  return isLoged ? (
    <ButtonLoged name={'aaaa'} profileUrl={exampleImg} />
  ) : (
    <ButtonNotLoged />
  )
}
