import React, { useEffect, useState } from "react";
import Chat from "./Components/Chat";
import ReactLoading from "react-loading";
import * as jose from "jose";
import api from "./services/api";
function App() {
  let response = {
    Codigo: "790a5634-5c2d-42df-a1af-08db2c653157",
    CodigoProcesso: "132312",
    Status: 1,
    Criado: "24/03/2023 12:42:12+00:00",
    Editado: null,
    Mensagens: null,
    Usuarios: [
      {
        Codigo: "7be0c87f-e9ef-4782-0b5c-08db2c653103",
        CodigoUsuario: "24",
        TipoUsuario: "comprador",
        TipoEmpresa: true,
        Criado: "24/03/2023 12:42:12+00:00",
        Mensagens: null,
      },
      {
        Codigo: "94fe1005-04c6-4cc8-0b5d-08db2c653103",
        CodigoUsuario: "1106",
        TipoUsuario: "fornecedor",
        TipoEmpresa: true,
        Criado: "24/03/2023 12:42:12+00:00",
        Mensagens: null,
      },
      {
        Codigo: "0ccb71c7-279a-4298-0b5b-08db2c653103",
        CodigoUsuario: "619",
        TipoUsuario: "comprador",
        TipoEmpresa: false,
        Criado: "24/03/2023 12:42:12+00:00",
        Mensagens: null,
      },
    ],
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [Token, setToken] = useState("");
  const [TokenDecode, setTokenDecode] = useState("");
  function decodeJWT(token: string) {
    try {
      const decoded = jose.decodeJwt(token);
      return decoded;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async function GetCreateChat(tokenUrl: string) {
  
    const headers = {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMGVlZjVlZDA3ZWI0ODYwYTZhOGI3MDUzZGUzMDA5YiIsInNjb3BlIjoiY2xpZW50ZSIsInN1YiI6InZpY3Rvci5hZG0iLCJjb2RpZ29fdXN1YXJpbyI6Ijg3OCIsIm5hbWVpZCI6InZpY3Rvci5hZG0iLCJ1bmlxdWVfbmFtZSI6IlZpY3RvciBBbW9yaW0gZGUgU291c2EiLCJlbWFpbCI6InZpY3Rvci5zb3VzYUBwb3J0YWxkZWNvbXByYXNwdWJsaWNhcy5jb20uYnIiLCJjb2RpZ29fY29tcHJhZG9yIjoiMTAwIiwibm9tZV9jb21wcmFkb3IiOiJQUkVGRUlUVVJBIE1VTklDSVBBTCBERSBWSUNUT1IiLCJyYXphb19zb2NpYWxfY29tcHJhZG9yIjoiUFJFRkVJVFVSQSBNVU5JQ0lQQUwgREUgVklDVE9SIiwiY25wal9jb21wcmFkb3IiOiIwNjY4MTg4NTcwMDAxMjEiLCJjb2RpZ29fZm9ybmVjZWRvciI6IjQwMCIsIm5vbWVfZm9ybmVjZWRvciI6ImVtcHJlc2Egc2VtIiwicmF6YW9fc29jaWFsX2Zvcm5lY2Vkb3IiOiJlbXByZXNhIHNlbSIsImNucGpfZm9ybmVjZWRvciI6IjQ2OTM2NjUzMDAwMTg4IiwicHJvY2Vzc29fbnVtZXJvIjoiNjU2OXU4IiwicHJvY2Vzc29faXRlbV9udW1lcm8iOiIxMjMxMjMxIiwicHJvY2Vzc29faXRlbV9kZXNjcmljYW8iOiJ0ZXN0ZSB0ZXN0ZSIsInByb2Nlc3NvX2l0ZW1fdmFsb3IiOiI1LjAwIiwicm9sZSI6WyJjb21wcmFkb3IiLCJhZG1pbmlzdHJhZG9yIl0sIm5iZiI6MTY3OTUyMDM4NSwiZXhwIjoxNjc5NTIzOTg1LCJpYXQiOjE2Nzk1MjAzODUsImlzcyI6Imh0dHBzOi8vYXV0aC5hcGkucGNwZGV2LmNvbS5iciJ9.6Y8yu93A3Jn6YT-Ssnw1y4dBmlG4TKijnPUh5idHJmk`,
    };
    try {
      let rest = await api.post("/api/conversa", {},{
        headers: headers,
      });
      setData(rest.data);
    } catch (error:any) {
      if(error.response.status){
       const code =error.response.data.ErrorMessages[4].split(" ")[6]
        console.log(error.response.data.ErrorMessages[4].split(" ")[6]);
        GetFindChat(tokenUrl,code)
      }
      }
     
    
   
  }
  useEffect(() => {
    const tokenUrl = new URLSearchParams(window.location.search).get("token");
    console.log(tokenUrl);

    if (tokenUrl !== null) {
      setToken(tokenUrl);
      const decoded: any = decodeJWT(tokenUrl);
      console.log(decoded);
      setTokenDecode(decoded);
      GetCreateChat(tokenUrl);
      // GetFindChat(tokenUrl)
    }
  }, []);

  async function GetFindChat(tokenUrl: string,code:string) {
    let rest = await api.get(
      `/api/conversa/buscar?codigo=${code}`,
      {
        headers: {
          Authorization: `Bearer ${tokenUrl}`,
        },
      }
    );
    setData(rest.data);
    console.log(rest.data);
  }

  return (
    <>
      {loading ? (
        <>
          <ReactLoading
            className="mx-auto mt-[40vh]"
            type="spin"
            color="#110ad0ed"
            height={"10%"}
            width={"10%"}
          />
        </>
      ) : (
        <Chat response={data} tokenJWT={Token} tokenDecode={TokenDecode} />
      )}
    </>
  );
}

export default App;
