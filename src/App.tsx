import React, { useEffect, useState } from 'react'
import Chat from './Components/Chat'
import ReactLoading from 'react-loading'
import * as jose from 'jose'
import api from './services/api'
function App() {
  let response = {
    Codigo: '790a5634-5c2d-42df-a1af-08db2c653157',
    CodigoProcesso: '132312',
    Status: 1,
    Criado: '24/03/2023 12:42:12+00:00',
    Editado: null,
    Mensagens: null,
    Usuarios: [
      {
        Codigo: '7be0c87f-e9ef-4782-0b5c-08db2c653103',
        CodigoUsuario: '24',
        TipoUsuario: 'comprador',
        TipoEmpresa: true,
        Criado: '24/03/2023 12:42:12+00:00',
        Mensagens: null,
      },
      {
        Codigo: '94fe1005-04c6-4cc8-0b5d-08db2c653103',
        CodigoUsuario: '1106',
        TipoUsuario: 'fornecedor',
        TipoEmpresa: true,
        Criado: '24/03/2023 12:42:12+00:00',
        Mensagens: null,
      },
      {
        Codigo: '0ccb71c7-279a-4298-0b5b-08db2c653103',
        CodigoUsuario: '619',
        TipoUsuario: 'comprador',
        TipoEmpresa: false,
        Criado: '24/03/2023 12:42:12+00:00',
        Mensagens: null,
      },
    ],
  }

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [Token, setToken] = useState('')
  const [TokenDecode, setTokenDecode] = useState('')
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
    const tokenUrl = new URLSearchParams(window.location.search).get('token')
    console.log(tokenUrl)

    if (tokenUrl !== null) {
      setToken(tokenUrl)
      const decoded: any = decodeJWT(tokenUrl)
      console.log(decoded)
      setTokenDecode(decoded)
      GetFindChat(tokenUrl)
    }
  }, [])

  async function GetCreateChat() {
    let rest = await api.get(`/api/conversa`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
  }
  async function GetFindChat(tokenUrl: string) {
    let rest = await api.get(
      `/api/conversa/buscar?codigo=52cf9367-235c-45ae-a012-08db2c7ccdab`,
      {
        headers: {
          Authorization: `Bearer ${tokenUrl}`,
        },
      },
    )
    setData(rest.data)
    console.log(rest.data)
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
