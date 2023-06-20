import React, { useEffect, useState } from 'react'
import Chat from './Components/Chat'
import ReactLoading from 'react-loading'
import * as jose from 'jose'
import api from './services/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
function App() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const [Token, setToken] = useState('')
  const [TokenDecode, setTokenDecode] = useState('')
  const [erroPage, setErroPage] = useState(false)
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
        .get('/api/mensagem?pagina=1&tamanhoPagina=10&final=false', {
          headers: headers,
        })
        .then((response) => setData(response.data))
    } catch (error: any) {
      setErroPage(true)

      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error}`,
        backdrop: false,
        showCancelButton: false,
        showConfirmButton: false,
      })
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
    } else {
      setErroPage(true)
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'A página atual não conseguiu carregar os dados do chat;\n\n ',
        footer: 'Erro: Token ausente ',
        backdrop: false,
        showCancelButton: false,
        showConfirmButton: false,
      })
    }
  }, [])

  return !erroPage ? (
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
  ) : (
    <></>
  )
}

export default App
