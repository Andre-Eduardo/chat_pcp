import React, { useEffect, useState } from 'react'
import Chat from './Components/Chat'
import ReactLoading from 'react-loading'
import * as jose from 'jose'
function App() {
  let response = {
    success: true,
    Conversa: {
      Codigo: '04632974-40c1-48b3-96bc-8b52c36493d4',
      CodigoProcesso: '132312',
      Status: 'aberto',
      Criado: '2023-03-22 00:00:00',
      Editado: '2023-03-22 00:00:00',
      Comprador: {
        Codigo: '6b6bb32d-ae20-4e61-88f9-921d661aa7f8',
        CodigoUsuario: '312312',
        TipoUsuario: 'comprador',
      },
      Fornecedor: {
        Codigo: '9f1017f3-9045-41d5-80b6-b87e7a5f8808',
        CodigoUsuario: '51231231',
        TipoUsuario: 'fornecedor',
      },
      Mensagens: [
        {
          Codigo: '205456de-9394-4605-8df3-556031a544d9',
          CodigoUsuario: '6b6bb32d-ae20-4e61-88f9-921d661aa7f8',
          CodigoItemProcesso: '1231231',
          Mensagem: 'Texto da mensagem',
          Visualizada: '2023-03-22 00:00:00.000',
          Criado: '2023-03-22 00:00:00.000',
          Editado: '2023-03-22 00:00:00.000',
          TipoUsuario: 'comprador',
        },
        {
          Codigo: 'db758d6f-9e2e-4c19-aad7-4a7c2a2a184a',
          CodigoUsuario: '9f1017f3-9045-41d5-80b6-b87e7a5f8808',
          CodigoItemProcesso: '1231231',
          Mensagem: 'Texto da mensagem forncedor',
          Visualizada: '2023-03-22 00:00:00.000',
          Criado: '2023-03-22 00:00:00.000',
          Editado: '2023-03-22 00:00:00.000',
          TipoUsuario: 'comprador',
        },
      ],
    },
  }
  const tokenJWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6ImNsaWVudGUiLCJzdWIiOiJ2aWN0b3IuYWRtIiwiY29kaWdvX3VzdWFyaW8iOiI2MTkiLCJuYW1laWQiOiJ2aWN0b3IuYWRtIiwidW5pcXVlX25hbWUiOiJWaWN0b3IgQW1vcmltIGRlIFNvdXNhIiwiZW1haWwiOiJ2aWN0b3Iuc291c2FAcG9ydGFsZGVjb21wcmFzcHVibGljYXMuY29tLmJyIiwiY29kaWdvX2NvbXByYWRvciI6IjI0Iiwibm9tZV9jb21wcmFkb3IiOiJQUkVGRUlUVVJBIE1VTklDSVBBTCBERSBWSUNUT1IiLCJyYXphb19zb2NpYWxfY29tcHJhZG9yIjoiUFJFRkVJVFVSQSBNVU5JQ0lQQUwgREUgVklDVE9SIiwiY25wal9jb21wcmFkb3IiOiIwNjY4MTg4NTcwMDAxMjEiLCJjb2RpZ29fZm9ybmVjZWRvciI6IjExMDYiLCJub21lX2Zvcm5lY2Vkb3IiOiJlbXByZXNhIHNlbSIsInJhemFvX3NvY2lhbF9mb3JuZWNlZG9yIjoiZW1wcmVzYSBzZW0iLCJjbnBqX2Zvcm5lY2Vkb3IiOiI0NjkzNjY1MzAwMDE4OCIsInByb2Nlc3NvX251bWVybyI6IjEzMjMxMiIsInByb2Nlc3NvX2l0ZW1fbnVtZXJvIjoiMTIzMTIzMSIsInByb2Nlc3NvX2l0ZW1fZGVzY3JpY2FvIjoidGVzdGUgdGVzdGUiLCJwcm9jZXNzb19pdGVtX3ZhbG9yIjoiNS4wMCJ9.n6rkK5rf1w3ZjoZrWWOsKVU7yhv6EETMskQkVwiEmi0'
  const [loading, setLoading] = useState(false)

  function decodeJWT(token: string) {
    try {
      const decoded = jose.decodeJwt(token)
      return decoded
    } catch (error) {
      console.log(error)
      return null
    }
  }

  useEffect(() => {
    const decoded = decodeJWT(tokenJWT)
    console.log(decoded)
  }, [])
  return (
    <>
      {loading ? (
        <>
          <ReactLoading
            className="mx-auto mt-[40vh]"
            type="spin"
            color="#110ad0ed"
            height={'10%'}
            width={'10%'}
          />
        </>
      ) : (
        <Chat response={response} />
      )}
    </>
  )
}

export default App
