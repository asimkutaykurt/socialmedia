import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/header.css'

export default function Header() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');

    if(!token) {
      navigate('/signin');
    }
  })
  return (
    <div className='Header'>

      <div className='header-login-container'>
        <span>{localStorage.getItem('USERNAME')}</span>
        <button onClick={() => {localStorage.clear(); navigate('signin')}}>Logout</button>
      </div>
      
      <div className='header-main-container'>
        <div className='header-title-container'>

          <div className='header-nav-container'>
            <ul className='header-ul'>
              <li className='header-list-item'>Home</li>
              <li className='header-list-item'>Topics</li>
              <li className='header-list-item'>Explore Projects</li>
              <li className='header-list-item'>Friends</li>
              <li className='header-list-item'>Projects</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}
