import React, { useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
export function Search({
  textInputSearch,
  setTextInputSearch,
  openSearch,
  setOpenSearch,
  NavigateToMessage,
}: any) {
  function handleOpenSearch() {
    setOpenSearch(!openSearch)
  }
  function SearchText(event: any) {
    event.preventDefault()

    NavigateToMessage()
    // handleOpenSearch()
  }
  return (
    <>
      {openSearch ? (
        <form onSubmit={SearchText} className="relative">
          <input
            value={textInputSearch}
            onChange={(e) => setTextInputSearch(e.target.value)}
            className="border border-[#1AA7BB] outline-none  w-52 h-8 flex items-center justify-end rounded-full pl-2"
          />
          <button type="submit" className="absolute right-2 top-[6px]">
            <IoMdSearch size={20} color="#1AA7BB" />
          </button>
        </form>
      ) : (
        <button
          onClick={handleOpenSearch}
          className="bg-[#1AA7BB] hover:opacity-70 w-8 h-8 flex items-center justify-center rounded-full"
        >
          <IoMdSearch size={20} color="#fff" />
        </button>
      )}
    </>
  )
}
