import authService from '../services/auth.service'
import { useState, useEffect } from 'react'
import LandingPage from './landingpage/LandingPage'

const HomePage = () => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
  }, [])

  const brand = <>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00ADB5" className="bi bi-circle-square" viewBox="0 0 16 16">
      <path d="M0 6a6 6 0 1 1 12 0A6 6 0 0 1 0 6z" />
      <path d="M12.93 5h1.57a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1.57a6.953 6.953 0 0 1-1-.22v1.79A1.5 1.5 0 0 0 5.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 4h-1.79c.097.324.17.658.22 1z" />
    </svg>
    <span className="ps-2 h2">ALGEBREB</span>
  </>

  return (
    <>
      {user ? (
        <div className="container mt-4 p-4">
          <h2>Bienvendo a {brand} {user.name}</h2>
        </div>
      ) : (
        <LandingPage />
      )}
    </>
  )
}

export default HomePage