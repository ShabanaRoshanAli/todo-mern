import axios from "axios";
import { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = {
      email,
      password
    };
    if (formData.email == '' || formData.password == '') {
      setErrorMessage('Please fill all fields!')
    } else {
      try {
        const response = await axios.post('http://localhost:8000/api/users/login', formData);
        const data = response.data;
        localStorage.setItem('token', data.token)
        localStorage.setItem('isAdmin', data.isAdmin)
        
        if (response.status === 200) {
          console.log(data.isAdmin);
          if (data.isAdmin == 'ADMIN_USER') {
            navigate('/dashboard')
          } if (data.isAdmin == 'NORMAL_USER') {
            navigate('/todo', { state: data });
            navigate(0)
          }
        }
      } catch (error) {
        setErrorMessage('Invalid Credentials!');
      }
    }
  };

  return (
    <div className="mainDiv">
      <div className="formDiv boxShadow">
        <FaUserAlt className="formMainIcon boxShadow" />
        <form onSubmit={handleLogin}
          className="form">
          <div style={{ display: 'flex' }}>
            <FaUserAlt className="inputIcon" />
            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="formInput"
            />
          </div>
          <div style={{ display: 'flex' }}>
            <FaLock className="inputIcon" />
            <input
              type="password"
              placeholder="admin123"
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
            Login
          </button>
        </form>
        <p onClick={() => navigate('/register')}
          style={{
            color: '#1E90FF',
            cursor: 'pointer'
          }}>
          Don't have an <span>account.</span>
        </p>
        <p onClick={() => navigate('/forgot-password')}
          style={{
            cursor: 'pointer',
            color: '#1E90FF'
          }}>
          Forgot Password?
        </p>
      </div>
    </div>
  )
}

export default Login;
