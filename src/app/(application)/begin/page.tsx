import { BookButton } from '@/components/BookButton'
import { BoxContent } from '@/components/BoxContent'
import { Header } from '@/components/Header'
import { AiOutlineLineChart } from 'react-icons/ai'

export default function Begin() {
  return (
    <main>
      <Header>
        <div className="flex items-center gap-3">
          <AiOutlineLineChart color="#50B2C0" size={26} />
          <p className="text-2xl font-bold text-gray-100">Início</p>
        </div>
      </Header>

      <main className="flex gap-16">
        <div className="flex flex-col gap-10">
          <BoxContent title="Sua úktima leitura" seeAll={true}>
            <BookButton type="sm" />
          </BoxContent>
        </div>
        <div>
          <section className="w-[608px]"></section>
        </div>
      </main>
    </main>
  )
}
