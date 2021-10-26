import authService from '../services/auth.service'
import {useState, useEffect} from 'react'

const HomePage = () => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
  }, [])

  return (
    <div className="container">
    {user ? (
      <h1>Bienvenido <strong>{user.name}</strong></h1>
    ) : (
      <h1>Algebreb</h1>
    )}
  </div>
  )
}

export default HomePage