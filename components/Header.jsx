import React, { useContext, useState } from 'react'
import { useTheme } from '../hooks/Theme'

const Header = () => {
  const [mode, setMode] = useTheme()

  const handleClick = () => {
    setMode(!mode)
    localStorage.setItem('toggleState', !mode)
  }

  return (
    <>
      <header className={`${mode ? 'darkMode' : ''}`}>
        <nav>
          <h1><a href="/">Where in the world?</a></h1>
          <div className="switcher" onClick={handleClick} >
            <i className={`fa-solid fa-${mode ? 'sun' : 'moon'}`}></i>
            <h4><span className="dark">Dark Mode</span><span className="light">Light Mode</span></h4>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
