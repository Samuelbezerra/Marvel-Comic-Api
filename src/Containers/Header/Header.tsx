import React from 'react'
import "./Header.css"

function Header() {
  return (
    <div className='marvel__header'>
        <div className="marvel__header--container">
            <div className="marvel__header--container--logo">
                <h1 onClick={()=>window.location.pathname = "/"}>MARVEL</h1>
            </div>
            <div className="marvel__header--container--menu">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Header