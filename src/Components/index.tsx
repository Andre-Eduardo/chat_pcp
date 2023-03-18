import React, { useEffect, useState } from 'react'
import 'react-chat-elements/dist/main.css'
import './styles.css'
import {
  Avatar,
  Input,
  MessageList,
  MessageBox,
  ChatItem,
} from 'react-chat-elements'

import { IoMdSearch } from 'react-icons/io'
import { IoPaperPlane } from 'react-icons/io5'
export default function Chat() {
  return (
    <div className="flex justify-center  h-[100vh] bg-[#F2F2F2] ">
      <div className="container   max-w-[43rem] bg-[#E4E4E4] flex flex-col items-center justify-between">
        <section className=" fixed z-50 h-[4.6rem] bg-white w-full max-w-[43rem] flex flex-row  justify-between items-center px-7">
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
          <div className="bg-[#1AA7BB] w-8 h-8 flex items-center justify-center rounded-full">
            <IoMdSearch size={20} color="#fff" />
          </div>
        </section>
        <section className="h-[100vh] w-full overflow-y-scroll  ">
          <div className=" z-10 w-full mt-[90px]    ">
            <MessageBox
              // @ts-ignore
              position="right"
              type={'text'}
              className="bg-black"
              styles={{ backgroundColor: 'green' }}
              text={'react.svg'}
              data={{
                uri: 'https://facebook.github.io/react/img/logo.svg',
                status: {
                  click: false,
                  loading: 0,
                },
              }}
            />
            <MessageBox
              // @ts-ignore
              position="left"
              type={'photo'}
              text={'react.svg'}
              data={{
                uri: 'https://facebook.github.io/react/img/logo.svg',
                status: {
                  click: false,
                  loading: 0,
                },
              }}
            />
            <MessageBox
              // @ts-ignore
              position="left"
              type={'photo'}
              text={'react.svg'}
              data={{
                uri: 'https://facebook.github.io/react/img/logo.svg',
                status: {
                  click: false,
                  loading: 0,
                },
              }}
            />
            <MessageBox
              // @ts-ignore
              position="left"
              type={'photo'}
              text={'react.svg'}
              data={{
                uri: 'https://facebook.github.io/react/img/logo.svg',
                status: {
                  click: false,
                  loading: 0,
                },
              }}
            />
            <MessageBox
              // @ts-ignore
              position="left"
              type={'photo'}
              text={'react.svg'}
              data={{
                uri: 'https://facebook.github.io/react/img/logo.svg',
                status: {
                  click: false,
                  loading: 0,
                },
              }}
            />
            <MessageBox
              // @ts-ignore
              position="left"
              type={'photo'}
              text={'react.svg'}
              data={{
                uri: 'https://facebook.github.io/react/img/logo.svg',
                status: {
                  click: false,
                  loading: 0,
                },
              }}
            />
            <MessageBox
              // @ts-ignore
              position="left"
              type={'photo'}
              text={'react.svg'}
              data={{
                uri: 'https://facebook.github.io/react/img/logo.svg',
                status: {
                  click: false,
                  loading: 0,
                },
              }}
            />
          </div>
        </section>
        <footer className="max-w-[43rem]  md:px-5 w-full fixed z-50 bottom-0 bg-[#E4E4E4] ">
          <div className="md:mb-3">
            <Input
              maxHeight={100}
              className="h-[3.75rem] rounded-xl "
              placeholder="Digite aqui."
              // multiline={true}
              rightButtons={
                <div className="bg-[#4784DE] w-8 h-8 flex items-center justify-center rounded-full mr-3">
                  <IoPaperPlane size={15} color="#fff" />
                </div>
              }
              inputStyle={{ paddingLeft: 12, fontSize: 16 }}
            />
          </div>
        </footer>
      </div>
    </div>
  )

  // const [inputTop, setInputTop] = useState(600) // Posição inicial do input
  // const [isFocused, setIsFocused] = useState(false) // Verifica se o input está em foco

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (isFocused) {
  //       setInputTop(inputTop * 0.3) // Define a posição do input quando estiver em foco
  //     } else {
  //       setInputTop(600) // Reseta a posição do input quando não estiver em foco
  //     }
  //   }
  //   window.addEventListener('resize', handleResize) // Adiciona ouvinte de eventos resize
  //   window.addEventListener('scroll', handleResize) // Adiciona ouvinte de eventos scroll

  //   return () => {
  //     window.removeEventListener('resize', handleResize) // Remove ouvinte de eventos resize ao desmontar componente
  //     window.removeEventListener('scroll', handleResize) // Remove ouvinte de eventos scroll ao desmontar componente
  //   }
  // }, [isFocused])

  // const handleFocus = () => setIsFocused(true) // Define isFocused como true quando o input recebe foco
  // const handleBlur = () => setIsFocused(false) // Define isFocused como false quando o input perde o foco

  // return (
  //   <form>
  //     <label>
  //       Nome:
  //       <input
  //         type="text"
  //         onFocus={handleFocus}
  //         onBlur={handleBlur}
  //         style={{ marginTop: inputTop }}
  //       />
  //     </label>
  //     <button type="submit">Enviar</button>
  //   </form>
  // )
}
