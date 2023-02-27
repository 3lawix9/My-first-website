import { useState, useEffect } from 'react'



const localeTimeString = new Date().toLocaleTimeString()

export default function LocalTime() {
  const [currentTime, setCurrentTime] = useState(localeTimeString)

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().getTime()
      const updatedTime = new Date(timestamp)
      setCurrentTime(updatedTime.toLocaleTimeString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div >
      <span className='time'>{currentTime}</span>
    </div>
  )
}
