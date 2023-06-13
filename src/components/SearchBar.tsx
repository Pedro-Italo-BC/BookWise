'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { BiSearch } from 'react-icons/bi'

export function SearchBar() {
  const [focus, setFocus] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const currentUrl = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleSearchBooks(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!searchValue) {
      return
    }
    const categoryParams = searchParams.get('category')
    const newUrl = currentUrl.concat(
      categoryParams
        ? `?category=${categoryParams}&search=${searchValue}`
        : `?search=${searchValue}`,
    )

    router.push(newUrl)

    setSearchValue('')
  }

  return (
    <form
      className={`flex w-[27.0625rem] justify-between rounded-md border px-5 py-3 transition duration-200 ease-in-out ${
        focus ? 'border-green-200' : 'border-gray-500'
      }`}
      onSubmit={handleSearchBooks}
    >
      <input
        onFocus={() => setFocus(true)}
        value={searchValue}
        onBlur={() => setFocus(false)}
        onChange={(data) => setSearchValue(data.target.value)}
        type="text"
        className="flex-1 bg-transparent text-sm font-normal placeholder:text-sm placeholder:font-normal placeholder:text-gray-400 focus:outline-none"
        placeholder="Buscar livro ou autor"
      />
      <button type="submit" className="pl-2">
        <BiSearch
          className={focus ? 'text-green-200' : 'text-gray-500'}
          size={20}
        />
      </button>
    </form>
  )
}
