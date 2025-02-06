import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { FaPowerOff } from "react-icons/fa";

function Logout() {
  const navigate = useNavigate()
  const handleClick = async ()=>{
    localStorage.clear()
    navigate('/login')
  }
  return (
    <Button onClick={handleClick}>
      <FaPowerOff />
    </Button>
  )
}

const Button = styled.button`
  display:flex;
  padding:0.5rem;
  border-radius:0.5rem;
  background-color:#c8b5f8;
  border:none;
  cursor: pointer;
  svg{
    font-size:1rem;
  }
`
export default Logout