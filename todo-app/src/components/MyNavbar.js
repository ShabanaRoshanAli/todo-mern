import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        navigate('/')
    }
    return (
        <div style={{
            display: 'flex',
            paddingRight: '2rem', 
            backgroundColor: '#89abcd',
            position: 'fixed',
            width: '100%'
        }}>
            <div style={{ marginLeft: 'auto' }}>
                {
                    token &&
                    <>
                        <button onClick={handleLogout}
                        className="navBtn"
                        >
                            Logout
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default MyNavbar