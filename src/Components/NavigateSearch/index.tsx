import React, { SetStateAction, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface NavigateSearchProps {
  positionMessages?: any
  currentIndexSearch?: null | number
  setCurrentIndexSearch: any
}
export function NavigateSearch(data: NavigateSearchProps) {
  const [index, setIndex] = useState(0)
  async function AddPosition() {
    await setIndex(index + 1)
    if (index <= data.positionMessages.length) {
      await data.setCurrentIndexSearch(index)
    } else {
      setIndex(index - 1)
    }
    console.log(data.currentIndexSearch)
  }

  async function RemovePosition() {
    if (index >= 0) {
      await setIndex(index - 1)
      await data.setCurrentIndexSearch(index)
    }
    console.log(index)
  }

  return (
    <div className="flex flex-row  w-20 md:w-28 justify-between items-center">
      <button onClick={() => RemovePosition()} className="hover:opacity-50">
        <FaChevronDown size={25} color="#121212" className="opacity-70" />
      </button>
      <button onClick={() => AddPosition()} className="hover:opacity-50">
        <FaChevronUp size={25} color="#121212" className="opacity-70" />
      </button>
    </div>
  )
}
