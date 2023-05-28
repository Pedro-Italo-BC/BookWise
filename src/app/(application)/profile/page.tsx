import { Header } from '@/components/Header'
import { AiOutlineUser } from 'react-icons/ai'

export default function Profile() {
  return (
    <main>
      <Header>
        <div className="flex items-center gap-3">
          <AiOutlineUser color="#50B2C0" size={26} />
          <p className="text-2xl font-bold text-gray-100">Perfil</p>
        </div>
      </Header>
    </main>
  )
}
