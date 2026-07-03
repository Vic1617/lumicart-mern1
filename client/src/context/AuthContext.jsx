import { createContext, useContext, useEffect, useState } from 'react'
import * as api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('lumicart_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('lumicart_user')
      }
    }
    setLoading(false)
  }, [])

  const persist = (userData) => {
    localStorage.setItem('lumicart_user', JSON.stringify(userData))
    setUser(userData)
  }

  const login = async (email, password) => {
    const data = await api.loginUser({ email, password })
    persist(data)
    return data
  }

  const register = async (name, email, password) => {
    const data = await api.registerUser({ name, email, password })
    persist(data)
    return data
  }

  const logout = () => {
    localStorage.removeItem('lumicart_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider')
  return ctx
}
