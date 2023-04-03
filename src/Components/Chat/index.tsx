/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react'

import './styles.css'

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
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import ReactLoading from 'react-loading'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
interface MessageProps {
  CodigoConversa?: string
  CodigoUsuario?: string
  Mensagem: string
  CodigoItemProcesso?: string
  Criado: string
  CodigoProcesso?: string
  CodigoParticipante?: string
  TipoUsuario?: string
  role?: string
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
  const [NameChat, setNameChat] = useState('')
  const [meta, setMeta] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  // envio de mensagem para api

  const { lastMessage } = useWebSocket(
    `wss:apiportaldecompras.dubbox.com.br/?CodigoUsuario=${tokenDecode.codigo_usuario}&CodigosProcessos=${tokenDecode.chat_codigo_processo}`,
    {
      onOpen: () => {
        console.log(`Connected to App WS`)
        setLoading(false)
      },

      onMessage: (event) => {
        if (lastMessage) {
          UpdateMessageWS()
          reproduzirSom()
        }
      },
      // queryParams: { token: '123456' },
      onError: (event) => {
        console.error(event)
      },
      shouldReconnect: (closeEvent) => true,
      reconnectInterval: 1000,
    },
  )

  useEffect(() => {
    if (tokenDecode.role) {
      const nomeComprador = tokenDecode.nome_comprador || 'Comprador'
      const nomeFornecedor = tokenDecode.nome_fornecedor || 'Fornecedor'

      tokenDecode.role.find((e: any) => {
        if (e === 'comprador') {
          setNameChat(nomeComprador)
        } else if (e === 'fornecedor') {
          setNameChat(nomeFornecedor)
        }
      })
    }
  }, [tokenDecode])
  async function UpdateTypeMessage(msnList?: any) {
    if (msnList) {
      var listaMensagem = msnList
      await listaMensagem?.map((mensagem: any) => {
        if (
          mensagem.CodigoUsuario === tokenDecode.codigo_usuario &&
          tokenDecode.role[0] === 'comprador'
        ) {
          mensagem.TipoUsuario = tokenDecode.nome_comprador
          mensagem.role = 'comprador'
        } else if (
          mensagem.CodigoUsuario === tokenDecode.codigo_usuario
          // tokenDecode.role[0] === 'fornecedor'
        ) {
          mensagem.TipoUsuario = tokenDecode.nome_fornecedor
          mensagem.role = 'fornecedor'
        } else if (
          mensagem.CodigoUsuario !== tokenDecode.codigo_usuario &&
          tokenDecode.role[0] === 'comprador'
        ) {
          mensagem.TipoUsuario = tokenDecode.nome_fornecedor
          mensagem.role = 'fornecedor'
        } else {
          mensagem.TipoUsuario = tokenDecode.nome_comprador
          mensagem.role = 'comprador'
        }
      })
      setMessageList(listaMensagem)
    }
    return true
  }
  useEffect(() => {
    UpdateTypeMessage(messageList)
  }, [messageList])

  useEffect(() => {
    if (response.Pagina.Mensagens) {
      setMeta(response.Meta)
      setMessageList(response.Pagina.Mensagens)
    } else {
      setMessageList([])
    }
  }, [response.Pagina.Mensagens])

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
      Mensagem: message,
    }
    try {
      await api.post(`/api/mensagem`, data, {
        headers: {
          Authorization: `Bearer ${tokenJWT}`,
        },
      })
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error}`,
      })
    }
  }

  function SubmitMessage(event: Event) {
    event.preventDefault()

    if (messageText) {
      if (messageList !== null) {
        setMessageList([
          {
            CodigoItemProcesso: '1231231',
            Mensagem: messageText,
            Criado: DateFormatted(),
            CodigoUsuario: tokenDecode.codigo_usuario,
            role: tokenDecode.role[0],
            TipoUsuario:
              tokenDecode.role[0] === 'comprador'
                ? tokenDecode.nome_comprador
                : tokenDecode.nome_fornecedor,
          },
          ...messageList,
        ])
      }
      setMessageText('')
      PostMessage(messageText)
    }
  }
  // navega para a mensagem que estar sendo buscada
  async function NavigateToMessage() {
    ClearSearchMessage(currentIndexSearch, messageRefs, textInputSearch)
    var posit: number[] = []
    if (messageList !== null) {
      messageList.filter((obj: any, index: any) => {
        const lowercaseText = obj.Mensagem.toLowerCase()
        const lowercaseSearchText = textInputSearch.toLowerCase()
        if (lowercaseText.indexOf(lowercaseSearchText) !== -1) {
          obj.positionInArray = index
          posit.push(index)
          return true
        }
      })

      // const positReverse = posit.reverse() // começa pela ultima mensagem

      setIndexOfMessageSearch(posit)
      setCurrentIndexSearch(posit[0])
      handleScrollToMessage(posit[0], messageRefs, textInputSearch)
    }
  }

  async function UpdateMessageWS() {
    let rest = await api.get(
      `/api/mensagem?pagina=1&tamanhoPagina=${currentPage * 40}`,
      {
        headers: {
          Authorization: `Bearer ${tokenJWT}`,
        },
      },
    )

    setMessageList(rest.data.Pagina.Mensagens)
    UpdateTypeMessage(rest.data.Pagina.Mensagens)
  }

  async function HandleNewMessage() {
    setLoadingButton(true)
    var index = currentPage + 1
    setCurrentPage(index)

    try {
      await api
        .get(`/api/mensagem?pagina=1&tamanhoPagina=${index * 40}`, {
          headers: {
            Authorization: `Bearer ${tokenJWT}`,
          },
        })
        .then((rest) => {
          setMessageList(rest.data.Pagina.Mensagens)
          UpdateTypeMessage(rest.data.Pagina.Mensagens)
          setLoadingButton(false)
        })
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error}`,
      })
    }
  }

  return (
    <>
      {loading ? (
        <ReactLoading
          className="mx-auto mt-[40vh]"
          type="spin"
          color="#110ad0ed"
          height={'10%'}
          width={'10%'}
        />
      ) : (
        <div className=" h-[100vh] bg-[#F2F2F2] ">
          <div className="  justify-center flex-col  ">
            <Header />
            <div className="  h-[100vh] mx-auto overscroll-y-contain bg-[#E4E4E4] flex flex-col items-center ">
              <section className=" px-3 md:px-9 h-[4.6rem] bg-white w-full flex flex-row justify-between items-center ">
                {!openSearch && (
                  <div className="flex flex-row">
                    <div className="relative w-12 h-12 bg-slate-500 rounded-full">
                      <div className="absolute w-3 h-3 bg-[#47DC44] rounded-full top-9 right-1"></div>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-black font-semibold text-lg">
                        {NameChat}
                      </h3>
                      <h4 className="text-[#A8A8A8] text-xs">
                        Processo: {tokenDecode.chat_codigo_processo} | Item:{' '}
                        {tokenDecode.chat_codigo_processo_item}
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
                <div className=" z-10 w-full mb-20 md:px-6   ">
                  {messageList !== null &&
                    messageList?.length > 0 &&
                    messageList.map((item, index) => (
                      <Message
                        reference={(el: any) =>
                          (messageRefs.current[index] = el)
                        }
                        key={index}
                        position="left"
                        Mensagem={item.Mensagem}
                        Criado={item.Criado}
                        role={item.role}
                        TipoUsuario={item.TipoUsuario}
                        token={tokenDecode}
                      />
                    ))}
                </div>

                {`http://localhost:5000/api/mensagem?pagina=${currentPage}&tamanhoPagina=40` !==
                  meta.Ultima && (
                  <div className=" items-center mb-8 justify-center flex">
                    <button
                      disabled={loadingButton}
                      className=" flex items-center justify-center text-white bg-[#4784DE] w-44 h-12 rounded-lg hover:opacity-70"
                      onClick={() => HandleNewMessage()}
                    >
                      {loadingButton ? (
                        <ReactLoading
                          className=""
                          type="spin"
                          color="#fff"
                          height={'30px'}
                          width={'30px'}
                        />
                      ) : (
                        'Carregar mais'
                      )}
                    </button>
                  </div>
                )}
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
      )}
    </>
  )
}
