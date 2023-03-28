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
  async function GetCreateChat(tokenUrl: string) {
    const headers = {
      Authorization: `Bearer ${tokenUrl}`,
    }
    try {
      let rest = await axios.post(
        'https://apiportaldecompras.dubbox.com.br/api/conversa',
        {},
        {
          headers: headers,
        },
      )
      console.log(rest)
      setData(rest.data)
    } catch (error: any) {
      console.log('error', error)
      if (error.response.status === '409') {
        const code = error.response.data.ErrorMessages[4].split(' ')[6]

        GetFindChat(tokenUrl, code)
      }
    }
  }
  useEffect(() => {
    const tokenUrl = new URLSearchParams(window.location.search).get('token')

    if (tokenUrl !== null) {
      setToken(tokenUrl)
      const decoded: any = decodeJWT(tokenUrl)
      setTokenDecode(decoded)
      GetCreateChat(tokenUrl)
      // GetFindChat(tokenUrl, '1da4b2ca-f5d5-490f-73a1-08db2f0bbc49')
      setLoading(false)
    } else {
      window.alert(
        'A página atual não conseguiu carregar os dados do chat;\n\n Erro: Token ausente ',
      )
    }
  }, [])

  async function GetFindChat(tokenUrl: string, code: string) {
    let rest = await api.get(`/api/conversa/buscar?codigo=${code}`, {
      headers: {
        Authorization: `Bearer ${tokenUrl}`,
      },
    })
    setData(rest.data)
  }

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
        <Chat response={data} tokenJWT={Token} tokenDecode={TokenDecode} />
      )}
    </>
  )
}

export default App
