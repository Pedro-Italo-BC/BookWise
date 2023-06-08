'use client'

import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'

export function SearchBar() {
  const [focus, setFocus] = useState(false)

  return (
    <div
      className={`flex w-[433px] justify-between rounded-md border px-5 py-3 transition duration-200 ease-in-out ${
        focus ? 'border-green-200' : 'border-gray-500'
      }`}
    >
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        type="text"
        className="flex-1 bg-transparent text-sm font-normal placeholder:text-sm placeholder:font-normal placeholder:text-gray-400 focus:outline-none"
        placeholder="Buscar livro ou autor"
      />
      <button className="pl-2">
        <BiSearch
          className={focus ? 'text-green-200' : 'text-gray-500'}
          size={20}
        />
      </button>
    </div>
  )
}
