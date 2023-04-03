import React from 'react'

interface propsMessageData {
  Mensagem: string
  Criado: string
  position: string
  reference: any
  role: string | undefined
  TipoUsuario: string | undefined
  token: any
}

export default function Message(data: propsMessageData) {
  return (
    <>
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
              {data.Criado}
            </h4>
          </div>
        </div>
      </div>
    </>
  )
}
