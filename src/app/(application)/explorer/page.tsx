import { Header } from '@/components/Header'
import { GiBinoculars } from 'react-icons/gi'

export default function Explorer() {
  return (
    <main>
      <Header>
        <div className="flex items-center gap-3">
          <GiBinoculars color="#50B2C0" size={26} />
          <p className="text-2xl font-bold text-gray-100">Explorar</p>
        </div>
      </Header>
    </main>
  )
}
