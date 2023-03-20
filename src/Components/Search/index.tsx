import React, { useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { FaChevronLeft } from 'react-icons/fa'
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
        <div className=" flex flex-row items-center ml-3 md:ml-0">
          <button className="hover:opacity-70" onClick={handleOpenSearch}>
            <FaChevronLeft
              className="mr-4 md:mr-10 opacity-70 "
              color="#121212"
              size={25}
            />
          </button>
          <form onSubmit={SearchText} className="relative mr-3">
            <input
              value={textInputSearch}
              onChange={(e) => setTextInputSearch(e.target.value)}
              className="border border-[#1AA7BB] outline-none  w-52 h-8 flex items-center justify-end rounded-full pl-2"
            />
            <button
              type="submit"
              className="absolute right-[1px] top-[6px] bg-white  justify-center flex items-center pr-2 pl-1 rounded-r-3xl"
            >
              <IoMdSearch size={20} color="#1AA7BB" />
            </button>
          </form>
        </div>
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
