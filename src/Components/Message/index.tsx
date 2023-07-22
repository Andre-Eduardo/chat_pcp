import React, { useEffect, useRef } from 'react'
import { DateFormatted } from '../../Functions/DateFormatted'
import { DateApi } from '../../Functions/DateApi'
import './styles.scss'
interface propsMessageData {
  Mensagem: string
  Criado: string
  position: string
  reference: any
  role: string | undefined
  TipoUsuario: string | undefined
  token: any
  Sender: boolean | undefined
}

export default function Message(data: propsMessageData) {
  const divRef = useRef(null)

  useEffect(() => {
    const div = divRef.current as any

    if (div && div.scrollWidth > div.clientWidth) {
      const palavras = data.Mensagem.split(' ')
      let textoFormatado = ''
      let linhaAtual = ''

      palavras.forEach((palavra) => {
        if (linhaAtual.length + palavra.length + 1 <= div.clientWidth) {
          linhaAtual += palavra + ' '
        } else {
          textoFormatado += linhaAtual.trim() + '<br />'
          linhaAtual = palavra + ' '
        }
      })

      textoFormatado += linhaAtual.trim()
      div.innerHTML = textoFormatado
    }
  }, [data.Mensagem])

  return (
    <>
      <div ref={data.reference} className=" w-full flex  mt-2">
        <div
          className={` w-auto px-4 pt-4 pb-2  rounded-r-3xl rounded-b-3xl ml-3 flex  items-center ${
            data.Sender ? 'bg-[#FFFFFF]' : 'bg-[#4784DE]'
          }`}
        >
          <div className=" mr-5 w-auto">
            <div className="flex flex-col w-auto ">
              <p
                className={`
                capitalize  mr-1
                ${data.Sender ? 'text-[#121212] opacity-80' : 'text-[#fff] '}`}
              >
                {`${data.TipoUsuario}`}:
              </p>
              <div className="over">
                <p
                  ref={divRef}
                  className={`font-normal  break-long-words 
                 ${
                   data.Sender
                     ? 'text-[#121212] opacity-50'
                     : 'text-[#fff] opacity-70'
                 }
                `}
                >
                  {data.Mensagem}
                </p>
              </div>
            </div>
            <h4
              className={` ${
                data.Sender ? 'text-[#121212] opacity-50' : 'text-[#fff]'
              } pt-2 opacity-50 text-sm text-left`}
            >
              {DateApi(data.Criado)}
            </h4>
          </div>
        </div>
      </div>
    </>
  )
}
