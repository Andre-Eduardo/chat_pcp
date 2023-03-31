import React, { useEffect, useState } from 'react'
import Chat from './Components/Chat'
import ReactLoading from 'react-loading'
import * as jose from 'jose'
import api from './services/api'
import { Alert } from 'react-bootstrap'
import axios from 'axios'
function App() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const [Token, setToken] = useState('')
  const [TokenDecode, setTokenDecode] = useState('')

  function decodeJWT(token: string) {
    try {
      const decoded = jose.decodeJwt(token)
      return decoded
    } catch (error) {
      return null
    }
  }
  // async function GetCreateChat(tokenUrl: string) {
  //   const headers = {
  //     Authorization: `Bearer ${tokenUrl}`,
  //   }
  //   try {
  //     let rest = await api
  //       .post(
  //         '/api/conversa',
  //         {},
  //         {
  //           headers: headers,
  //         },
  //       )
  //       .then((response) => setData(response.data))
  //   } catch (error: any) {
  //     if (error.response.status === 409) {
  //       const code = error.response.data.ErrorMessages[4].split(' ')[6]

  //       GetFindChat(tokenUrl, code)
  //     }
  //   }
  //   return true
  // }

  async function GetMessage(tokenUrl: string) {
    const headers = {
      Authorization: `Bearer ${tokenUrl}`,
    }
    try {
      let rest = await api
        .get('/api/mensagem', {
          headers: headers,
        })
        .then((response) => setData(response.data))
    } catch (error: any) {
      window.alert(error)
    }
    return true
  }
  useEffect(() => {
    const tokenUrl = new URLSearchParams(window.location.search).get('token')

    if (tokenUrl !== null) {
      setToken(tokenUrl)
      const decoded: any = decodeJWT(tokenUrl)
      setTokenDecode(decoded)

      GetMessage(tokenUrl).then(() => setLoading(false))
      // GetFindChat(tokenUrl, '1da4b2ca-f5d5-490f-73a1-08db2f0bbc49')
    } else {
      window.alert(
        'A página atual não conseguiu carregar os dados do chat;\n\n Erro: Token ausente ',
      )
    }
  }, [])

  // async function GetFindChat(tokenUrl: string, code: string) {
  //   let rest = await api
  //     .get(`/api/conversa/buscar?codigo=${code}`, {
  //       headers: {
  //         Authorization: `Bearer ${tokenUrl}`,
  //       },
  //     })
  //     .then((response) => setData(response.data))
  // }

  return (
    <>
      {loading && data ? (
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
        <Chat response={data} tokenJWT={Token} tokenDecode={TokenDecode} />
      )}
    </>
  )
}

export default App
