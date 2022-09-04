import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log(email, password, username);
    if(email !== '' && password !== '' && username !== '') {
      axios.post('http://localhost:4000/signup', { email: email, password: password, username: username })
          navigate('/signin')
      } else {
        alert("Try again.")
      }
  }


  return (
    <div className='Register'>
        <form>
          <h2>Register</h2>
            <input className='login-register-input-field' type="text" name='firstname' required placeholder='Firstname*' />
            <input className='login-register-input-field' type="text" name='lastname' required placeholder='Lastname*'/>
            <input className='login-register-input-field' type="email" placeholder='Email*' required onChange={(e) => {setEmail(e.target.value)}} />
            <input className='login-register-input-field' type="text" name='username' required placeholder='Username*' value={username} onChange={(e) => {setUsername(e.target.value)}} />
            <input className='login-register-input-field' type="password" name="password" required placeholder='Password*' value={password} onChange={(e) => {setPassword(e.target.value)}} />
            <input className='login-register-input-field' type="number" name='age' placeholder='Age'/>

            <button className='login-register-button all-buttons' type='submit' onClick={handleSubmit}>Register</button>

            <div className='link-to-login-container'>
              <span>Already have an account?</span>
              <Link className='link-to-login-page' to='/signin'>Sign In!</Link>
            </div>
        </form>
    </div>
  )
}
