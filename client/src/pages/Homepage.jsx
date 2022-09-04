import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../components/Header'
import Leftbar from '../components/Leftbar';
import Rightbar from '../components/Rightbar';
import axios from 'axios';
import './styles/homepage.css'

export default function Homepage() {
  const [image, setImage] = useState('');

  const handleChange = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  }

  const handleApi = () => {
    const url = 'http://localhost:4000/api/image';
    const formData = new FormData();
    formData.append('image', image);
    axios.post(url, formData)
      .then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }


  return (
    <div className='Homepage'>
      <div className='homepage-mid-container'>
        <Leftbar />
        <div className='routes-container'>
          <Header /> 
          <div className='routes'>
            <div className='image-upload-container'>
              <h2>Image Upload</h2>
              <img width={350} src={image ? URL.createObjectURL(image) : null} alt="" />
              <input type="file" onChange={handleChange} />
              <button onClick={handleApi}>Submit</button>
            </div>
            <Routes>
              <Route />
            </Routes>
          </div>

        </div>
      <Rightbar />
      </div>
    </div>
  )
}
