import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NewSubmit() {

  const navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log(otp, password)
        axios.post('http://localhost:4000/submit-otp',
            {
                otp: otp,
                password: password,
            })
            .then(res => {
                console.log(res.data)
                if (res.data.code === 200) {
                    navigate('/signin')
                } else {
                    alert('server err / wrong OTP')
                }
            }).catch(err => {
                console.log(err)
            })
    }

  return (
    <div className='NewSubmit'>
        <form action='/signin'>
            <h2>New Password</h2>

            <h3>OTP:</h3>
            <input type="text" placeholder='New Password' value={otp} onChange={(e) => {setOtp(e.target.value)}} />
            <h3>New Password:</h3>
            <input type="text" placeholder='New Password' value={password} onChange={(e) => {setPassword(e.target.value)}} />

            <button className='all-buttons new-password-button' onClick={handleSubmit}>CHANGE PASSWORD</button>

            <div className='link-to-register-container'>
              <Link className='link-to-register-page' to='/signin'>Back to Login</Link>
            </div>
            <div className='forgot-password-container'>
              <span>Forgot Password?</span>
              <Link className='link-to-login-page' to='/signin'>Sign In!</Link>
            </div>
        </form>
    </div>
  )
}
