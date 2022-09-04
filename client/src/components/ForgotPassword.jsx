import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const navigate = useNavigate()


  const handleSubmit = (e) => {
    console.log(email);
    axios.post('http://localhost:4000/send-otp', { email: email })
    .then(res => {
      console.log(res.data);
      if(res.data.code === 200) {
        navigate('/otp')
      } else {
        alert('Email / Server Error')
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className='ForgotPassword'>
        <form action='otp'>
            <h2>Generate new Password</h2>

            <h3>Your Email:</h3>
            <input type="email" value={email} placeholder='Email' onChange={(e) => {setEmail(e.target.value)}} />
            <button className='restore-password-button all-buttons' onClick={handleSubmit} >Send OTP</button>

            <div className='link-to-register-container'>
              <span>Not registered?</span>
              <Link className='link-to-register-page' to='/signup'>Sign Up!</Link>
            </div>
            <div className='forgot-password-container'>
              <span>Go back to Login</span>
              <Link className='link-to-login-page' to='/signin'>Sign In!</Link>
            </div>
        </form>
    </div>
  )
}
