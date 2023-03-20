import React, { SetStateAction, useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface NavigateSearchProps {
  positionMessages?: any
  currentIndexSearch?: null | number
  setCurrentIndexSearch: any
  handleScrollToMessage: any
  ClearSearchMessage: any
}
export function NavigateSearch(data: NavigateSearchProps) {
  // const [index, setIndex] = useState(1)
  // console.log('index', index)
  // console.log('array de busca', data.positionMessages)

  const [index, setIndex] = useState(1)
  const [addPositionTriggered, setAddPositionTriggered] = useState(false)
  const [removePositionTriggered, setRemovePositionTriggered] = useState(false)

  // Hook useEffect for AddPosition
  useEffect(() => {
    if (data.positionMessages && addPositionTriggered) {
      data.ClearSearchMessage(data.positionMessages[index - 1])
      data.handleScrollToMessage(data.positionMessages[index])
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

  // async function AddPosition() {
  //   if (index < data.positionMessages.length) {
  //     setIndex((i) => i + 1)
  //     data.ClearSearchMessage(data.positionMessages[index - 1])
  //     data.handleScrollToMessage(data.positionMessages[index])
  //     data.setCurrentIndexSearch(data.positionMessages[index])
  //   }
  // }

  async function RemovePosition() {
    if (index > 0) {
      setIndex((i) => i - 1)
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
// import React, { useEffect, useState } from 'react'
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

// interface NavigateSearchProps {
//   positionMessages?: any
//   currentIndexSearch?: null | number
//   setCurrentIndexSearch: any
//   handleScrollToMessage: any
//   ClearSearchMessage: any
// }
// export function NavigateSearch(data: any) {
//   const [index, setIndex] = useState(1)
//   const [addPositionTriggered, setAddPositionTriggered] = useState(false)
//   const [removePositionTriggered, setRemovePositionTriggered] = useState(false)

//   // Hook useEffect for AddPosition
//   useEffect(() => {
//     if (data.positionMessages && addPositionTriggered) {
//       data.ClearSearchMessage(data.positionMessages[index - 1])
//       data.handleScrollToMessage(data.positionMessages[index])
//       data.setCurrentIndexSearch(data.positionMessages[index])
//       setAddPositionTriggered(false)
//     }
//   }, [index, data.positionMessages, addPositionTriggered])

//   // Hook useEffect for RemovePosition
//   useEffect(() => {
//     if (data.positionMessages && removePositionTriggered) {
//       data.ClearSearchMessage(data.positionMessages[index + 1])
//       data.handleScrollToMessage(data.positionMessages[index])
//       data.setCurrentIndexSearch(data.positionMessages[index])
//       setRemovePositionTriggered(false)
//     }
//   }, [index, data.positionMessages, removePositionTriggered])

//   function Addposition() {
//     if (index < data.positionMessages.length - 1) {
//       setIndex((i) => i + 1)
//       setAddPositionTriggered(true)
//     }
//   }

//   function Removeposition() {
//     if (index > 0) {
//       setIndex((i) => i - 1)
//       setRemovePositionTriggered(true)
//     }
//   }

//   return (
//     <div className="flex flex-row  w-20 md:w-28 justify-between items-center">
//       <button onClick={() => Removeposition()} className="hover:opacity-50">
//         <FaChevronDown size={25} color="#121212" className="opacity-70" />
//       </button>
//       <button onClick={() => Addposition()} className="hover:opacity-50">
//         <FaChevronUp size={25} color="#121212" className="opacity-70" />
//       </button>
//     </div>
//   )
// }
