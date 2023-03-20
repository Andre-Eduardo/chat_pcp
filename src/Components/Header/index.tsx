import React, { useEffect, useState } from 'react'
import Logo from '../../assets/logo192.svg'
import { Dropdown } from 'react-bootstrap'
import { MdPerson } from 'react-icons/md'
import { FaClock } from 'react-icons/fa'
import './navbar.scss'
export function Header() {
  const [hours, setHours] = useState(
    new Date().getHours().toString().padStart(2, '0'),
  )
  const [minutes, setMinutes] = useState(
    new Date().getMinutes().toString().padStart(2, '0'),
  )
  const [seconds, setSeconds] = useState(
    new Date().getSeconds().toString().padStart(2, '0'),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setHours(new Date().getHours().toString().padStart(2, '0'))
      setMinutes(new Date().getMinutes().toString().padStart(2, '0'))
      setSeconds(new Date().getSeconds().toString().padStart(2, '0'))
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="header">
      <div className="w-full h-[4.75rem] bg-white flex flex-row justify-between px-3 md:px-7 pt-[0.875rem] pb-[0.625rem] drop-shadow-md">
        <div className="">
          <img src={Logo} alt="Logo" width="140" />
        </div>
        <div className="relative flex flex-row justify-center items-center font-['Rawline']">
          <h3 className="invisible absolute md:relative  md:visible font-normal text-lg colo-[#333333] pr-7 ">
            Dubbox Tecnologia <i className="fas fa-chevron-down"></i>
          </h3>
          <div className="relogio">
            <p className="horario flex flex-row justify-center items-center w-20 ">
              <FaClock className="mt-1 mr-2" size={16} />
              {hours}:{minutes}:{seconds}
            </p>
            <p className="localidade">Horário de Brasília</p>
          </div>
          <MdPerson
            size={40}
            className="ml-2 md:invisible md:absolute"
            color="#1AA7BB"
          />
        </div>
      </div>
    </div>
  )
}
