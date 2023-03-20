import React, { SetStateAction, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface NavigateSearchProps {
  positionMessages?: any
  currentIndexSearch?: null | number
  setCurrentIndexSearch: any
  handleScrollToMessage: any
  ClearSearchMessage: any
}
export function NavigateSearch(data: NavigateSearchProps) {
  const [index, setIndex] = useState(1)
  console.log('index', index)
  console.log('array de busca', data.positionMessages)

  async function AddPosition() {
    if (index < data.positionMessages.length) {
      setIndex(index + 1)
      data.ClearSearchMessage(data.positionMessages[index - 1])
      data.handleScrollToMessage(data.positionMessages[index])
      data.setCurrentIndexSearch(data.positionMessages[index])
    }
  }

  async function RemovePosition() {
    if (index > 0) {
      setIndex(index - 1)
      data.ClearSearchMessage(data.positionMessages[index + 1])
      data.handleScrollToMessage(data.positionMessages[index])
      data.setCurrentIndexSearch(data.positionMessages[index])
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
