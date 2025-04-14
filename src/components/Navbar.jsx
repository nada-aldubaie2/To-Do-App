import { Link } from 'react-router-dom'
import useAuthStore from '../stores/authStore'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Todo App</Link>
      </div>
      <div className="navbar-actions">
        {user ? (
          <button onClick={logout} className="btn-logout">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <Link to="/register" className="btn-register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}