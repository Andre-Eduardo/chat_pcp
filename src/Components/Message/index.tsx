import React from 'react'
interface propsMessageData {
  Mensagem: string
  Criado: string
  position: string
  reference: any
  // CodigoUsuario: string
  CodigoConversa: string
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
        <div className={` max-w-[95%] px-4 pt-4 pb-2  rounded-r-3xl rounded-b-3xl ml-3 flex  items-center ${data.TipoUsuario ? 'bg-[#FFFFFF]' : 'bg-[#4784DE]'}`}   >
          <div className=" mr-5 ">
           <div className='flex ' >
            <p className="capitalize text-[#000]  ">
              {`${data.TipoUsuario}` || "fornecedor"}: &nbsp;
            </p>
            <p className="text-[#121212] opacity-50 font-normal text-left ">
             {data.Mensagem}
            </p>
            </div>
            <h4 className="text-[#121212] pt-2 opacity-50 text-sm text-left">
              {data.Criado.toString()}
            </h4>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  )
}
