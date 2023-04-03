import React from 'react'
import { IoPaperPlane } from 'react-icons/io5'

export function Input({ click, text, handleText, ...rest }: any) {
  function changeMessageText(event: any) {
    handleText(event.target.value)
  }
  function handleKeydown(event: any) {
    if (event.code === 'Enter') {
      click(event)

      handleText('')
    }
  }
  return (
    <>
      <div>
        <form
          onSubmit={click}
          className="w-full flex flex-row items-center  bg-white rounded-xl"
        >
          <input
            value={text}
            onKeyDown={handleKeydown}
            onChange={changeMessageText}
            className="h-[3.75rem] rounded-xl  outline-none w-full pl-3 "
            placeholder="Digite aqui."
          />
          <button
            type="submit"
            className="bg-[#4784DE] hover:opacity-75 w-8 h-8 flex items-center justify-center rounded-full mr-1 md:mr-3"
          >
            <IoPaperPlane size={15} color="#fff" />
          </button>
        </form>
      </div>
    </>
  )
}
