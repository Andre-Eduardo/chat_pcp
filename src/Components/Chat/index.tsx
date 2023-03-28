/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react'
import 'react-chat-elements/dist/main.css'
import './styles.css'
import { Avatar } from 'react-chat-elements'
// import useWebSocket from 'react-use-websocket'
import Message from '../Message'
import { Input } from '../Input'
import { Search } from '../Search'
import { NavigateSearch } from '../NavigateSearch'
import { Header } from '../Header'
import { handleScrollToMessage } from '../../Functions/handleScrollToMessage'
import { ClearSearchMessage } from '../../Functions/ClearSearchMessage'
import { DateFormatted } from '../../Functions/DateFormatted'
import api from '../../services/api'
import notificacaoSound from '../../assets/songs/notification.mp3'
interface MessageProps {
  CodigoConversa: string
  CodigoUsuario: string
  Mensagem: string
  Visualizada: string
  CodigoItemProcesso: string
  Criado: string
  Editado: string
  Conversa: 'string'
  TipoUsuario?: string
}

export default function Chat({ response, tokenJWT, tokenDecode }: any) {
  const [textInputSearch, setTextInputSearch] = useState('')
  const messageListRef = useRef<any>(null)
  const [messageList, setMessageList] = useState<MessageProps[] | null>(null)
  const [messageText, setMessageText] = useState('')
  const [openSearch, setOpenSearch] = useState(false)
  const [indexOfMessageSearch, setIndexOfMessageSearch] = useState<number[]>([])
  const [currentIndexSearch, setCurrentIndexSearch] = useState(-1)
  const messageRefs = useRef<any>([])
  const [numProcesso, setNumProcesso] = useState('')
  const [NameChat, setNameChat] = useState('')
  const [messages, setMessages] = useState<any>([])
  // envio de mensagem para api

  // const { sendMessage, lastMessage } = useWebSocket(
  //   `wss:apiportaldecompras.dubbox.com.br/?CodigoUsuario=${tokenDecode.codigo_usuario}`,
  //   {
  //     onOpen: () => console.log(`Connected to App WS`),
  //     onMessage: (event) => {
  //       if (lastMessage) {
  //         console.log(lastMessage)
  //         if (response?.Codigo) {
  //           UpdateMessageWS()
  //           reproduzirSom()
  //         }
  //       }
  //     },
  //     // queryParams: { token: '123456' },
  //     onError: (event) => {
  //       console.error(event)
  //     },
  //     shouldReconnect: (closeEvent) => true,
  //     reconnectInterval: 1000,
  //   },
  // )

  useEffect(() => {
    console.log(tokenDecode)

    if (response.Mensagens) {
      setMessageList(response.Mensagens)
    } else {
      setMessageList([])
    }

    setNumProcesso(response.CodigoProcesso)
  }, [])

  useEffect(() => {
    if (tokenDecode.role) {
      const nomeComprador = tokenDecode.nome_comprador || 'Comprador'
      const nomeFornecedor = tokenDecode.nome_fornecedor || 'Fornecedor'

      const nome = tokenDecode.role.find((e: any) => {
        if (e === 'comprador') {
          setNameChat(nomeFornecedor)
        } else if (e === 'fornecedor') {
          setNameChat(nomeComprador)
        }
      })
    }
  }, [tokenDecode])

  useEffect(() => {
    if (tokenDecode && response.length > 0) {
      var listaMensagem = response.Mensagens

      response.Usuarios.map((user: any) => {
        if (user.TipoUsuario === 'fornecedor') {
          listaMensagem?.map((mensagem: any) => {
            if (mensagem.CodigoUsuario === user.CodigoUsuario) {
              mensagem.TipoUsuario = tokenDecode.nome_fornecedor
            }
          })
        } else if (user.TipoUsuario === 'comprador') {
          listaMensagem?.map((mensagem: any) => {
            if (mensagem.CodigoUsuario === user.CodigoUsuario) {
              mensagem.TipoUsuario = 'sistema'
            }
          })
        }
      })
    }
  }, [response])

  // useEffect(() => {
  //   if (response.Mensagens) {
  //     setMessageList(response.Mensagens)
  //   } else {
  //     setMessageList([])
  //   }
  // }, [response.Mensagens])

  useEffect(() => {
    if (openSearch === false) {
      ClearSearchMessage(currentIndexSearch, messageRefs, textInputSearch)
    }
  }, [openSearch])

  function reproduzirSom() {
    const som = new Audio(notificacaoSound)
    som.play()
  }

  // envio de mensagem para api
  async function PostMessage(message: string) {
    const data = {
      CodigoConversa: response.Codigo,
      Mensagem: message,
    }
    let rest = await api.post(`/api/mensagem`, data, {
      headers: {
        Authorization: `Bearer ${tokenJWT}`,
      },
    })
    console.log(rest)
  }

  function SubmitMessage(event: Event) {
    event.preventDefault()

    if (messageText) {
      if (messageList !== null) {
        setMessageList([
          ...messageList,
          {
            CodigoConversa: response.Codigo,
            // CodigoUsuario: '9f1017f3-9045-41d5-80b6-b87e7a5f8808',
            CodigoItemProcesso: '1231231',
            Mensagem: messageText,
            Visualizada: '2023-03-22 00:00:00.000',
            Criado: DateFormatted(),
            Editado: '2023-03-22 00:00:00.000',
            Conversa: 'string',
            CodigoUsuario: '400',
            TipoUsuario:
              tokenDecode.role[0] === 'comprador'
                ? 'Sistema'
                : tokenDecode.nome_fornecedor,
          },
        ])
      }
      setMessageText('')
      PostMessage(messageText)
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
    if (messageList !== null) {
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
  }

  async function UpdateMessageWS() {
    let rest = await api.get(
      `/api/mensagem?codigoConversa=${response.Codigo}`,
      {
        headers: {
          Authorization: `Bearer ${tokenJWT}`,
        },
      },
    )

    await rest.data.map(async (item: any, index: any) => {
      await response.Usuarios.map((data: any) => {
        if (data.CodigoUsuario == item.CodigoUsuario) {
          rest.data[index].TipoUsuario =
            data.TipoUsuario === 'comprador' ? 'Sistema' : 'Fornecedor'
        }
      })
    })

    setMessageList(rest.data)
  }

  // useEffect(() => {
  //   setInterval(() => {
  //     if (response?.Codigo) {
  //       Loop()
  //     }
  //   }, 5000)
  // }, [response])

  return (
    <div className=" h-[100vh] bg-[#F2F2F2] ">
      <div className="  justify-center flex-col  ">
        <Header />
        <div className="  h-[100vh] mx-auto overscroll-y-contain bg-[#E4E4E4] flex flex-col items-center ">
          <section className=" px-3 md:px-9 h-[4.6rem] bg-white w-full flex flex-row justify-between items-center ">
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
                    {NameChat}
                  </h3>
                  <h4 className="text-[#A8A8A8] text-xs">
                    Processo: {tokenDecode.processo_numero} | Item:{' '}
                    {tokenDecode.processo_item_numero} | Valor: R$
                    {tokenDecode.processo_item_valor} | Descrição:{' '}
                    {tokenDecode.processo_item_descricao}
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
            className="h-[100vh] w-full overflow-y-scroll mb-16 "
          >
            {/* <div className=" relative flex justify-center items-center h-2 mt-4  ">
              <a className="h-[1px] bg-[#707070] w-full opacity-30 "></a>
              <div className="absolute bg-[#E4E4E4] px-4">
                <h3 className=" text-[#121212] opacity-50 ">Hoje</h3>
              </div>
            </div> */}
            <div className=" z-10 w-full mb-20 md:px-6   ">
              {messageList !== null &&
                messageList?.length > 0 &&
                messageList.map((item, index) => (
                  <Message
                    reference={(el: any) => (messageRefs.current[index] = el)}
                    key={index}
                    position="left"
                    Mensagem={item.Mensagem}
                    Criado={item.Criado}
                    // CodigoUsuario={item.CodigoUsuario}
                    CodigoConversa={item.CodigoConversa}
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
