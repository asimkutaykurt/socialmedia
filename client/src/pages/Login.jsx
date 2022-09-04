import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './styles/login-register-forgotpw.css'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    console.log(email, password);
    e.preventDefault()
    axios.post('http://localhost:4000/signin', { email: email, password: password, username: username })
    .then(res => {
      console.log(res.data);

      if(res.data.code === 500) {
        alert('User not found')
      } else if(res.data.code === 404) {
        alert('Password is wrong')
      } else if(res.data.code === 200) {
        //navigate to home
        navigate("/");
        localStorage.setItem('TOKEN', res.data.token)
        localStorage.setItem('EMAIL', res.data.email)
        localStorage.setItem('USERNAME', res.data.username)
      }
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <div className='Login'>
      <form>
            <h2>Login</h2>
            <input className='login-register-input-field' type="text" placeholder='Username or Email' required onChange={(e) => {setEmail(e.target.value); setUsername(e.target.value)}}/>
            <input className='login-register-input-field' type="password" name="password" placeholder='Password' required onChange={(e) => {setPassword(e.target.value)}}/>

            <button onClick={handleSubmit} className='login-register-button all-buttons'>Login</button>

            <div className='link-to-register-container'>
              <span>Not registered?</span>
              <Link className='link-to-register-page' to='/signup'>Sign Up!</Link>
            </div>
            <div className='forgot-password-container'>
              <span>Forgot Password?</span>
              <Link className='link-to-forgotpassword-page' to='/forgot-password'>Click here</Link>
            </div>
              
              
        </form>
    </div>
  )
}
