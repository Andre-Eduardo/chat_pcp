/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react'
import 'react-chat-elements/dist/main.css'
import './styles.css'
import { Avatar } from 'react-chat-elements'

import Message from '../Message'
import { Input } from '../Input'
import { Search } from '../Search'
import { NavigateSearch } from '../NavigateSearch'
import { Header } from '../Header'
import { handleScrollToMessage } from '../../Functions/handleScrollToMessage'
import { ClearSearchMessage } from '../../Functions/ClearSearchMessage'
import { DateFormatted } from '../../Functions/DateFormatted'
interface MessageProps {
  Codigo: string
  CodigoUsuario: string
  CodigoItemProcesso: string
  Mensagem: string
  Visualizada: string
  Criado: string
  Editado: string
  TipoUsuario: string
}

export default function Chat() {
  let response = {
    success: true,
    Conversa: {
      Codigo: '04632974-40c1-48b3-96bc-8b52c36493d4',
      CodigoProcesso: '132312',
      Status: 'aberto',
      Criado: '2023-03-22 00:00:00',
      Editado: '2023-03-22 00:00:00',
      Comprador: {
        Codigo: '6b6bb32d-ae20-4e61-88f9-921d661aa7f8',
        CodigoUsuario: '312312',
        TipoUsuario: 'comprador',
      },
      Fornecedor: {
        Codigo: '9f1017f3-9045-41d5-80b6-b87e7a5f8808',
        CodigoUsuario: '51231231',
        TipoUsuario: 'fornecedor',
      },
      Mensagens: [
        {
          Codigo: '205456de-9394-4605-8df3-556031a544d9',
          CodigoUsuario: '6b6bb32d-ae20-4e61-88f9-921d661aa7f8',
          CodigoItemProcesso: '1231231',
          Mensagem: 'Texto da mensagem',
          Visualizada: '2023-03-22 00:00:00.000',
          Criado: '2023-03-22 00:00:00.000',
          Editado: '2023-03-22 00:00:00.000',
          TipoUsuario: 'comprador',
        },
        {
          Codigo: 'db758d6f-9e2e-4c19-aad7-4a7c2a2a184a',
          CodigoUsuario: '9f1017f3-9045-41d5-80b6-b87e7a5f8808',
          CodigoItemProcesso: '1231231',
          Mensagem: 'Texto da mensagem forncedor',
          Visualizada: '2023-03-22 00:00:00.000',
          Criado: '2023-03-22 00:00:00.000',
          Editado: '2023-03-22 00:00:00.000',
          TipoUsuario: 'comprador',
        },
      ],
    },
  }

  const [textInputSearch, setTextInputSearch] = useState('')
  const messageListRef = useRef<any>(null)
  const [messageList, setMessageList] = useState<MessageProps[]>([])
  const [messageText, setMessageText] = useState('')
  const [openSearch, setOpenSearch] = useState(false)
  const [indexOfMessageSearch, setIndexOfMessageSearch] = useState<number[]>([])
  const [currentIndexSearch, setCurrentIndexSearch] = useState(-1)
  const messageRefs = useRef<any>([])

  useEffect(() => {
    setMessageList(response.Conversa.Mensagens)
  }, [])

  useEffect(() => {
    if (openSearch === false) {
      ClearSearchMessage(currentIndexSearch, messageRefs, textInputSearch)
    }
  }, [openSearch])

  function SubmitMessage(event: Event) {
    event.preventDefault()

    if (messageText) {
      setMessageList([
        ...messageList,
        {
          Codigo: 'db758d6f-9e2e-4c19-aad7-4a7c2a2a184a',
          CodigoUsuario: '9f1017f3-9045-41d5-80b6-b87e7a5f8808',
          CodigoItemProcesso: '1231231',
          Mensagem: messageText,
          Visualizada: '2023-03-22 00:00:00.000',
          Criado: DateFormatted(),
          Editado: '2023-03-22 00:00:00.000',
          TipoUsuario: 'fornecedor',
        },
      ])
      setMessageText('')
      // navega para ultima mensagem enviada
      const messageListDiv = messageListRef.current
      const scrollHeight = messageListDiv.scrollHeight
      const height = messageListDiv.clientHeight
      const maxScrollTop = scrollHeight - height
      messageListDiv.scrollTo({ top: maxScrollTop, behavior: 'smooth' })
    }
  }
  // navega para a mensagem que estar sendo buscada
  async function NavigateToMessage() {
    ClearSearchMessage(currentIndexSearch, messageRefs, textInputSearch)
    var posit: number[] = []
    const filteredArray = messageList.filter((obj: any, index: any) => {
      const lowercaseText = obj.text.toLowerCase()
      const lowercaseSearchText = textInputSearch.toLowerCase()
      if (lowercaseText.indexOf(lowercaseSearchText) !== -1) {
        obj.positionInArray = index
        posit.push(index)
        return true
      }
    })

    const positReverse = posit.reverse() // começa pela ultima mensagem

    setIndexOfMessageSearch(positReverse)
    setCurrentIndexSearch(positReverse[0])
    handleScrollToMessage(positReverse[0], messageRefs, textInputSearch)
  }

  return (
    <div className=" h-[100vh] bg-[#F2F2F2] ">
      <div className="  justify-center flex-col  ">
        <Header />
        <div className="  h-[100vh] mx-auto overscroll-y-contain   bg-[#E4E4E4] flex flex-col items-center ">
          <section className=" px-3 md:px-9 h-[4.6rem] bg-white w-full  flex flex-row  justify-between items-center ">
            {!openSearch && (
              <div className="flex flex-row">
                <div className="relative">
                  <Avatar
                    src="https://avatars.githubusercontent.com/u/80540635?v=4"
                    alt="avatar"
                    size="xlarge"
                    type="rounded"
                  />
                  <div className="absolute w-3 h-3 bg-[#47DC44] rounded-full top-9 right-1"></div>
                </div>
                <div className="ml-3">
                  <h3 className="text-black font-semibold text-lg">
                    Caroline Carvalho
                  </h3>
                  <h4 className="text-[#A8A8A8] text-xs">
                    Processo 1234567 | Item 654321
                  </h4>
                </div>
              </div>
            )}
            <div>
              <Search
                NavigateToMessage={NavigateToMessage}
                openSearch={openSearch}
                setOpenSearch={setOpenSearch}
                textInputSearch={textInputSearch}
                setTextInputSearch={setTextInputSearch}
              />
            </div>
            {openSearch && (
              <NavigateSearch
                positionMessages={indexOfMessageSearch}
                currentIndexSearch={currentIndexSearch}
                messageRefs={messageRefs}
                textInputSearch={textInputSearch}
                setCurrentIndexSearch={setCurrentIndexSearch}
                handleScrollToMessage={handleScrollToMessage}
                ClearSearchMessage={ClearSearchMessage}
              />
            )}
          </section>

          <div
            ref={messageListRef}
            className="h-[100vh] w-full overflow-y-scroll  mb-16   "
          >
            <div className=" relative flex justify-center items-center h-2 mt-4  ">
              <a className="h-[1px] bg-[#707070]  w-full opacity-30 "></a>
              <div className="absolute bg-[#E4E4E4] px-4">
                <h3 className=" text-[#121212] opacity-50 ">Hoje</h3>
              </div>
            </div>
            <div className=" z-10 w-full mb-20 md:px-6   ">
              {messageList.map((item, index) => (
                <Message
                  reference={(el: any) => (messageRefs.current[index] = el)}
                  key={index}
                  position="left"
                  Mensagem={item.Mensagem}
                  Criado={item.Criado}
                  CodigoUsuario={item.CodigoUsuario}
                  Codigo={item.Codigo}
                  TipoUsuario={item.TipoUsuario}
                />
              ))}
            </div>
          </div>
          <footer className="fixed   md:px-8 w-full  bottom-0 bg-[#E4E4E4] ">
            <div className="md:mb-3">
              <Input
                text={messageText}
                handleText={setMessageText}
                click={SubmitMessage}
              />
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
