import { useState, useCallback } from 'react'

const useToggle = (initState = false) => {
  const [status, setStatus] = useState(initState)

  const toggle = useCallback(() => {
    setStatus((state) => !state)
  }, [])

  return [status, toggle]
}

export default useToggle
