import React, { useEffect, useState } from 'react'
import 'react-chat-elements/dist/main.css'
import {
  Avatar,
  Input,
  MessageList,
  MessageBox,
  ChatItem,
} from 'react-chat-elements'
import { ScrollView } from 'react-native-web'
import { IoMdSearch } from 'react-icons/io'

export default function Chat() {
  return (
    <div className="flex justify-center  h-[100vh] bg-[#F2F2F2] ">
      <div className="container  max-w-[43rem] bg-[#E4E4E4] flex flex-col items-center justify-between">
        <section className="fixed h-[4.6rem] bg-white w-full max-w-[43rem] flex flex-row  justify-between items-center px-7">
          <div className="flex flex-row">
            <Avatar
              src="https://avatars.githubusercontent.com/u/80540635?v=4"
              alt="avatar"
              size="xlarge"
              type="rounded"
            />
            <div className="ml-3">
              <h3 className="text-black font-semibold text-lg">
                Caroline Carvalho
              </h3>
              <h4 className="text-[#A8A8A8] text-xs">
                Processo 1234567 | Item 654321
              </h4>
            </div>
          </div>
          <IoMdSearch />
        </section>
        <section className="h-full w-full">
          <div className="bg-black w-full h-full ">
            <ScrollView>
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
            </ScrollView>
          </div>
        </section>
        <footer className="max-w-[43rem] mb-3 mx-5 w-full fixed bottom-0   ">
          <Input
            maxHeight={1}
            className="h-[3.75rem] rounded-xl "
            placeholder="Digite aqui."
            multiline={true}
            inputStyle={{ paddingLeft: 12, fontSize: 16 }}
          />
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
