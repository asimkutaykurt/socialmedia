import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import ForgotPassword from './components/ForgotPassword';
import NewSubmit from './components/NewSubmit';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/otp' element={<NewSubmit />} />
      </Routes>
    </div>
  );
}

export default App;
