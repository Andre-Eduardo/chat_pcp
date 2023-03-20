import React from 'react'
import Logo from '../../assets/logo192.svg'
import { Dropdown } from 'react-bootstrap'

export function Header() {
  return (
    <div className=" z-50   bg-white  drop-shadow-md shadow-slate-300  row justify-center">
      <div className="col">
        <img src={Logo} alt="Logo" width="140" />
      </div>
      <div className="col flex justify-end">
        <Dropdown>
          <Dropdown.Toggle variant="link" id="dropdown-basic">
            Dubbox Tecnologia <i className="fas fa-chevron-down"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#">Trocar senha</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => {}}>
              Sair
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
    // <div className="bg-black">oi</div>
  )
}
