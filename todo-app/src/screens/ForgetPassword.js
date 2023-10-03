import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";

const ForgetPassword = () => {
  const api = 'http://localhost:8000/api/users/reset';
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    const userData = {
      name, email, password
    }
    console.log('user', userData);
    if (userData.name == '' || userData.email == '' || userData.password =='') {
      setErrorMessage('Please fill all fields!')
    } else {
      try {
        const response = await axios.put(api, userData)
        if (response.status === 200) {
          console.log(response.status);
          navigate('/')
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  }

  return (
    <div className='mainDiv'>
      <div className="formDiv boxShadow">
        <FaUserAlt className="formMainIcon boxShadow" />
        <form onSubmit={handleForgotPassword}
          className="form">

          <div style={{ display: 'flex' }}>
            <FaUserAlt className='inputIcon' />
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="formInput"
            />
          </div>
          <div style={{ display: 'flex' }}>
            <FaEnvelope className='inputIcon' />
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="formInput"
            />
          </div>
          <div style={{ display: 'flex' }}>
            <FaLock className="inputIcon" />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="formInput"
            />
          </div>
          {
            errorMessage &&
            <div className="errorDiv">
              <h4 className="errorText">
                {errorMessage}
              </h4>
            </div>
          }
          <button type='sub,it' className="formBtn">
            Submit
          </button>

        </form>
      </div>
    </div>
  )
}

export default ForgetPassword