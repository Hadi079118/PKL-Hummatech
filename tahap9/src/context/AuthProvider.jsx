import { useState, useEffect, useCallback } from 'react'
import { AuthContext } from './AuthContext'

const STORAGE_KEY = 'auth_token'
const USER_KEY = 'auth_user'

const MOCK_USERS = [
  { id: 1, name: 'Hadi', email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Budi', email: 'user@example.com', password: 'password123', role: 'user' },
]

function simulateLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = MOCK_USERS.find(u => u.email === email && u.password === password)
      if (found) {
        resolve({
          token: 'mock-jwt-token-' + Date.now(),
          user: { id: found.id, name: found.name, email: found.email, role: found.role }
        })
      } else {
        reject(new Error('Email atau password salah'))
      }
    }, 1500)
  })
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_KEY)
    const savedUser = localStorage.getItem(USER_KEY)
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const result = await simulateLogin(email, password)
    localStorage.setItem(STORAGE_KEY, result.token)
    localStorage.setItem(USER_KEY, JSON.stringify(result.user))
    setToken(result.token)
    setUser(result.user)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
  }, [])

  const isAuthenticated = !!token
  const isAdmin = user?.role === 'admin'
  const hasRole = useCallback((roles) => {
    if (!user) return false
    if (!roles || roles.length === 0) return true
    return roles.includes(user.role)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, isAdmin, hasRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
