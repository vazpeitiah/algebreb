import authService from '../services/auth.service'
import { useState, useEffect } from 'react'
import LandingPage from './landingpage/LandingPage'
import Welcome from './welcomepage/Welcome'

const HomePage = () => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
  }, [])

  return (
    <>
      {user ? (
        <Welcome />
      ) : (
        <LandingPage />
      )}
    </>
  )
}

export default HomePage