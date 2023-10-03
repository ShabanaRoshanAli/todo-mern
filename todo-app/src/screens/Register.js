import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
const Register = () => {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault();
    
    const formData = {
        name,
        email,
        password
    };

    if (formData.name === '' || formData.email === '' || formData.password === '') {
        setErrorMessage('Please fill all fields!');
    } else {
        try {
            const response = await axios.post('http://localhost:8000/api/users', formData);

            if (response.status === 200) {
                const data = response.data;
                setErrorMessage(null);
                // Perform navigation or other actions on successful registration
                navigate('/');
            } else {
                setErrorMessage('Registration failed');
            }
        } catch (error) {
            setErrorMessage('Email already in used!');
        }
    }
};
return (
    <div className='mainDiv'>
      <div className="formDiv boxShadow">
        <FaUserAlt className="formMainIcon boxShadow" />
      <form onSubmit={handleRegister}
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
        <button type="submit" className="formBtn">
          Signup
        </button>
      </form>
      </div>
    </div>
  )
}

export default Register