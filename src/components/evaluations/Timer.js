import { useState, useEffect } from 'react'
import helpers from '../../lib/helpers'

const Timer = ({ endDate }) => {
  const [time, setTime] = useState('')

  useEffect(() => {
    let interval = null

    interval = setInterval(() => {
      setTime(helpers.timeLeft(new Date().toISOString(), endDate))
    }, 1000)
    
    return () => clearInterval(interval)
  }, [time, endDate])

  return (
    <span className="time-left">
      {time}
    </span>
  )
}

export default Timer
