/* eslint-disable no-unused-vars */
'use client'

import { useState, useEffect, useCallback } from 'react'

const AUTH_KEY = 'isAuthenticated'

export function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const getStoredAuth = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(AUTH_KEY) === 'true'
      } catch (error) {
        return false
      }
    }
    return false
  }, [])

  const setStoredAuth = useCallback((value) => {
    setIsAuthenticated(value)
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, value.toString())
      window.dispatchEvent(new Event('auth_changed'))
    }
  }, [])

  useEffect(() => {
    const initialAuth = getStoredAuth()
    setIsAuthenticated(initialAuth)

    const handleStorageChange = (event) => {
      if (event.key === AUTH_KEY) {
        setIsAuthenticated(event.newValue === 'true')
      }
    }

    const handleAuthChange = () => {
      setIsAuthenticated(getStoredAuth())
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('auth_changed', handleAuthChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('auth_changed', handleAuthChange)
    }
  }, [getStoredAuth])

  return { isAuthenticated, setAuth: setStoredAuth }
}
