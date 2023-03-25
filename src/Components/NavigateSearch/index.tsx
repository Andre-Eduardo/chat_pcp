import React, { SetStateAction, useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface NavigateSearchProps {
  positionMessages?: any
  currentIndexSearch?: null | number
  setCurrentIndexSearch: any
  handleScrollToMessage: any
  ClearSearchMessage: any

  messageRefs: any
  textInputSearch: any
}
export function NavigateSearch(data: NavigateSearchProps) {
  const [index, setIndex] = useState(0)
  const [addPositionTriggered, setAddPositionTriggered] = useState(false)
  const [removePositionTriggered, setRemovePositionTriggered] = useState(false)

  // Hook useEffect for AddPosition
  useEffect(() => {
    if (data.positionMessages && addPositionTriggered) {
      data.ClearSearchMessage(
        data.positionMessages[index - 1],
        data.messageRefs,
        data.textInputSearch,
      )

      data.handleScrollToMessage(
        data.positionMessages[index],
        data.messageRefs,
        data.textInputSearch,
      )

      data.setCurrentIndexSearch(data.positionMessages[index])
      setAddPositionTriggered(false)
    }
  }, [index, data.positionMessages, addPositionTriggered])

  function AddPosition() {
    if (index < data.positionMessages.length - 1) {
      setIndex((i) => i + 1)
      setAddPositionTriggered(true)
    }
  }

  useEffect(() => {
    if (data.positionMessages && removePositionTriggered) {
      data.ClearSearchMessage(
        data.positionMessages[index + 1],
        data.messageRefs,
        data.textInputSearch,
      )
      data.handleScrollToMessage(
        data.positionMessages[index],
        data.messageRefs,
        data.textInputSearch,
      )
      data.setCurrentIndexSearch(data.positionMessages[index])
      setRemovePositionTriggered(false)
    }
  }, [index, data.positionMessages, removePositionTriggered])

  function RemovePosition() {
    if (index > 0) {
      setIndex((i) => i - 1)
      setRemovePositionTriggered(true)
    }
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
