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
export default function Chat() {
  let data = [
    {
      text: 'andre',
      hour: '11:39',
      position: 'left',
    },
    {
      text: 'é preciso que você envie hoje antes de meio dia',
      hour: '11:39',
      position: 'left',
    },
    {
      text: 'Certo, estou coletando as informações. Assim que possível irei mandar elas.',
      hour: '11:39',
      position: 'right',
    },
    {
      text: 'Atenciosamente Davi Nogueira.',
      hour: '11:39',
      position: 'right',
    },
    {
      text: 'Olá, estou no aguardo das informações',
      hour: '11:39',
      position: 'left',
    },
    {
      text: 'Olá, estou no aguardo das informações',
      hour: '11:39',
      position: 'left',
    },
    {
      text: 'Olá, estou no aguardo das informações',
      hour: '11:39',
      position: 'left',
    },
    {
      text: 'Olá, estou no aguardo das informações',
      hour: '11:39',
      position: 'left',
    },
    {
      text: 'Olá, estou no aguardo das informações',
      hour: '11:39',
      position: 'left',
    },
    {
      text: 'Olá, estou no aguardo das informações',
      hour: '11:39',
      position: 'left',
    },
    {
      text: 'Olá, estou no aguardo das informações',
      hour: '11:39',
      position: 'left',
    },
    {
      text: 'Olá, estou no aguardo das informações',
      hour: '11:39',
      position: 'left',
    },
    {
      text: 'Olá, estou no aguardo das informações',
      hour: '11:39',
      position: 'left',
    },
    {
      text: 'Olá, estou no aguardo das informações',
      hour: '11:39',
      position: 'left',
    },
  ]
  const [textInputSearch, setTextInputSearch] = useState('')
  const messageListRef = useRef<any>(null)
  const [messageList, setMessageList] = useState(data)
  const [messageText, setMessageText] = useState('')
  const [openSearch, setOpenSearch] = useState(false)
  const [indexOfMessageSearch, setIndexOfMessageSearch] = useState<number[]>([])
  const [currentIndexSearch, setCurrentIndexSearch] = useState(0)
  const messageRefs = useRef<any>([])

  useEffect(() => {
    if (openSearch === false) {
      ClearSearchMessage(currentIndexSearch)
    }
  }, [openSearch])

  function SubmitMessage(event: Event) {
    event.preventDefault()
    if (messageText) {
      setMessageList([
        ...messageList,
        {
          text: messageText,
          hour: '11:39',
          position: 'right',
        },
      ])
      setMessageText('')
      const messageListDiv = messageListRef.current
      const scrollHeight = messageListDiv.scrollHeight
      const height = messageListDiv.clientHeight
      const maxScrollTop = scrollHeight - height
      messageListDiv.scrollTo({ top: maxScrollTop, behavior: 'smooth' })
    }
  }
  function handleScrollToMessage(index: any) {
    if (messageRefs.current[index]) {
      messageRefs.current[index].scrollIntoView({ behavior: 'smooth' })
      messageRefs.current[index].style.backgroundColor = 'rgb(75, 132, 222,0.4)'

      // Crie um novo elemento span com o estilo desejado
      const span = document.createElement('span')
      span.style.backgroundColor = 'yellow'
      span.innerText = textInputSearch

      // Acesse o elemento que contém o texto usando a referência
      const texto =
        messageRefs.current[index].children[0].children[0].children[0]

      // Encontre a posição do trecho que você quer substituir
      const posicao = texto.innerText.indexOf(textInputSearch)

      // Crie um nó de texto com o conteúdo antes do trecho
      const antes = document.createTextNode(texto.innerText.slice(0, posicao))

      // Crie um nó de texto com o conteúdo depois do trecho
      const depois = document.createTextNode(
        texto.innerText.slice(posicao + textInputSearch.length),
      )

      // Remova todo o conteúdo do elemento que contém o texto
      texto.innerHTML = ''

      // Adicione os nós de texto e o elemento span na ordem correta
      texto.appendChild(antes)
      texto.appendChild(span)
      texto.appendChild(depois)
    }
  }
  function ClearSearchMessage(index: any) {
    if (messageRefs.current[index]) {
      messageRefs.current[index].style.backgroundColor = ''

      // Crie um novo elemento span com o estilo desejado
      const span = document.createElement('span')
      span.style.backgroundColor = ''
      span.innerText = textInputSearch

      // Acesse o elemento que contém o texto usando a referência
      const texto =
        messageRefs.current[index].children[0].children[0].children[0]

      // Encontre a posição do trecho que você quer substituir
      const posicao = texto.innerText.indexOf(textInputSearch)

      // Crie um nó de texto com o conteúdo antes do trecho
      const antes = document.createTextNode(texto.innerText.slice(0, posicao))

      // Crie um nó de texto com o conteúdo depois do trecho
      const depois = document.createTextNode(
        texto.innerText.slice(posicao + textInputSearch.length),
      )

      // Remova todo o conteúdo do elemento que contém o texto
      texto.innerHTML = ''

      // Adicione os nós de texto e o elemento span na ordem correta
      texto.appendChild(antes)
      texto.appendChild(span)
      texto.appendChild(depois)
    }
  }

  async function NavigateToMessage() {
    ClearSearchMessage(currentIndexSearch)
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

    const positReverse = posit.reverse()
    console.log(positReverse)
    setIndexOfMessageSearch(positReverse)
    setCurrentIndexSearch(positReverse[0])
    handleScrollToMessage(positReverse[0])
  }

  return (
    <div className=" h-[100vh] bg-[#F2F2F2] ">
      <div className="  justify-center flex-col overscroll-y-none ">
        <Header />
        <div className="container   h-[100vh] mx-auto overscroll-y-contain max-w-[43rem] bg-[#E4E4E4] flex flex-col items-center justify-between">
          <section className=" px-3 md:px-9 h-[4.6rem] bg-white w-full max-w-[43rem] flex flex-row  justify-between items-center ">
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
                ClearSearchMessage={ClearSearchMessage}
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
            <div className=" z-10 w-full mb-20   ">
              {messageList.map((message, index) => (
                <Message
                  reference={(el: any) => (messageRefs.current[index] = el)}
                  key={index}
                  text={message.text}
                  hour={message.hour}
                  position={message.position}
                />
              ))}
            </div>
          </div>
          <footer className="fixed max-w-[43rem]  md:px-3 w-full  bottom-0 bg-[#E4E4E4] ">
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
