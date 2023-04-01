import React, { useEffect, useState } from 'react'
import Chat from './Components/Chat'
import ReactLoading from 'react-loading'
import * as jose from 'jose'
import api from './services/api'

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

  async function GetMessage(tokenUrl: string) {
    const headers = {
      Authorization: `Bearer ${tokenUrl}`,
    }
    try {
      await api
        .get('/api/mensagem?pagina=1&tamanhoPagina=40', {
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
