import React from 'react'
import { DateFormatted } from '../../Functions/DateFormatted'
interface propsMessageData {
  Mensagem: string
  Criado: string
  position: string
  reference: any
  role: string | undefined
  TipoUsuario: string | undefined
}

export default function Message(data: propsMessageData) {
  return (
    <>
      {/* {data.position === 'right' ? (
        <div
          ref={data.reference}
          className="container w-full flex justify-end mt-2"
        >
          <div className="  px-4 pt-4 pb-2 bg-[#4784DE] rounded-l-3xl rounded-b-3xl mr-3 flex  items-center">
            <div className=" mr-5 ">
              <p className="text-white font-normal text-right max-w-[300px] break-words">
                {data.Mensagem}
              </p>
              <h4 className="text-white text-[0.625rem] text-right">
                {data.Criado}
              </h4>
            </div>
          </div>
        </div>
      ) : ( */}
      <div ref={data.reference} className="container w-full flex  mt-2">
        <div
          className={` max-w-[95%] px-4 pt-4 pb-2  rounded-r-3xl rounded-b-3xl ml-3 flex  items-center ${
            data.role === 'comprador' ? 'bg-[#FFFFFF]' : 'bg-[#4784DE]'
          }`}
        >
          <div className=" mr-5 ">
            <div className="flex flex-col">
              <p
                className={`
                capitalize  mr-1
                ${
                  data.role === 'comprador'
                    ? 'text-[#121212] opacity-80'
                    : 'text-[#fff] '
                }`}
              >
                {`${data.TipoUsuario}` || 'fornecedor'}:
              </p>
              <p
                className={`font-normal text-left  ${
                  data.role === 'comprador'
                    ? 'text-[#121212] opacity-50'
                    : 'text-[#fff] opacity-70'
                }`}
              >
                {data.Mensagem}
              </p>
            </div>
            <h4
              className={` ${
                data.role === 'comprador'
                  ? 'text-[#121212] opacity-50'
                  : 'text-[#fff]'
              } pt-2 opacity-50 text-sm text-left`}
            >
              {/* {data.Criado.split('+')[0]} */}
              {data.Criado}
            </h4>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  )
}
