import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ForgetPassword from "./screens/ForgetPassword";
import MyNavbar from "./components/MyNavbar";
import Admin from "./screens/Admin";
import NotFound from "./screens/NotFound";

function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');

  const [currentUser, setCurrentUser] = useState(
    isAdmin === null ? 'PUBLIC_USER' : isAdmin
);

  useEffect(() => {
      setCurrentUser(isAdmin); 
  }, [isAdmin]);

  const PublicElement = ({ children }) => {
    return (
      <>
        {children}
      </>
    )
  }
  const UserElement = ({ children }) => {
    if (currentUser === 'NORMAL_USER') {
      return <>{children}</>
    } else {
      return  <div className="mainDiv">
                <div className="formDiv boxShadow">
                    <div>
                        <h2 style={{ color: '#10273d' }}>
                        You do not access to this page!
                        </h2>
                    </div>
                </div>
            </div>
    }
  }

  const AdminElement = ({ children }) => {
    if (currentUser === 'ADMIN_USER') {
      return <>{children}</>
    } else {
      return  <div className="mainDiv">
                <div className="formDiv boxShadow">
                    <div>
                        <h2 style={{ color: '#10273d' }}>
                        You do not access to this page!
                        </h2>
                    </div>
                </div>
            </div>
    }
  }
  
  return (
    <>
      <MyNavbar />
      {/* <div>
      Navbar 
    </div> */}
      <Routes>
        {/* Public User  */}
        <Route path="/register" element={<PublicElement><Register /></PublicElement>} />
        <Route path="/forgot-password" element={<PublicElement><ForgetPassword /></PublicElement>} />
        <Route path="/" element={<PublicElement><Login /></PublicElement>} />
        {/* Normal User  */}
        <Route path="/todo" element={<UserElement><Home /></UserElement>} />
       {/* Admin User  */}
       <Route path="/dashboard" element={<AdminElement><Admin /></AdminElement>} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;
