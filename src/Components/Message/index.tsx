import React from 'react'
interface propsMessageData {
  text: string
  hour: string
  position: string
  reference: any
}
export default function Message(data: propsMessageData) {
  console.log(data.reference)
  return (
    <>
      {data.position === 'right' ? (
        <div
          ref={data.reference}
          className="container w-full flex justify-end mt-2"
        >
          <div className="  px-4 pt-4 pb-2 bg-[#4784DE] rounded-l-3xl rounded-b-3xl mr-3 flex  items-center">
            <div className=" mr-5 ">
              <p className="text-white font-normal text-right max-w-[300px]">
                {data.text}
              </p>
              <h4 className="text-white text-[0.625rem] text-right">
                {data.hour}
              </h4>
            </div>
          </div>
        </div>
      ) : (
        <div ref={data.reference} className="container w-full flex  mt-2">
          <div className="  px-4 pt-4 pb-2 bg-[#FFFFFF] rounded-r-3xl rounded-b-3xl ml-3 flex  items-center">
            <div className=" mr-5 ">
              <p className="text-[#121212] opacity-50 font-normal text-right max-w-[300px]">
                {data.text}
              </p>
              <h4 className="text-[#121212] opacity-25 text-[0.625rem] text-right">
                {data.hour}
              </h4>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
