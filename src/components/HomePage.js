import authService from '../services/auth.service'
import {useState, useEffect} from 'react'
import LandingPage from './landingpage/LandingPage'

const HomePage = () => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
  }, [])

  const brand = <span className="navbar-brand"> <i className="bi bi-circle-square"></i> ALGEBREB</span>

  return (
    <>
    {user ? (
      <div className="container mt-4 p-4">
        <h2>Welcome to {brand} {user.name}</h2>
      </div>
    ) : (
      <LandingPage />
    )}
  </>
  )
}

export default HomePage