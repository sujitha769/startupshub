/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'

import type { ReactNode } from 'react'
import api from '../api/axios'
import type { User, LoginPayload, RegisterPayload, AuthResponse } from '../types/auth.types'

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (payload: LoginPayload) => Promise<User>
  register: (payload: RegisterPayload, endpoint?: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<User | null>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem('token')
  )
  // 👇 start true only if token exists — prevents flicker on protected routes
  const [isLoading, setIsLoading] = useState<boolean>(
    () => !!localStorage.getItem('token')
  )
  const [isInitialized, setIsInitialized] = useState(false)

  const persistUser = useCallback((nextUser: User | null) => {
    setUser(nextUser)
    if (nextUser) {
      localStorage.setItem('user', JSON.stringify(nextUser))
      return
    }
    localStorage.removeItem('user')
  }, [])

  const refreshUser = useCallback(async () => {
    if (!token) {
      persistUser(null)
      return null
    }
    try {
      const res = await api.get<User>('/auth/me')
      persistUser(res.data)
      return res.data
    } catch (error) {
      setToken(null)
      localStorage.removeItem('token')
      persistUser(null)
      throw error
    }
  }, [persistUser, token])

  // Verify token on mount — isLoading starts true if token exists,
  // so ProtectedRoute shows spinner instead of flashing /login
  // LoginPage is NOT protected so isLoading doesn't affect it
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (!storedToken) {
      setIsInitialized(true)
      return
    }
    api.get<User>('/auth/me')
      .then((res) => persistUser(res.data))
      .catch(() => {
        setToken(null)
        localStorage.removeItem('token')
        persistUser(null)
      })
      .finally(() => {
        setIsLoading(false)
        setIsInitialized(true)
      })
  }, [])

  const login = async (payload: LoginPayload): Promise<User> => {
    setIsLoading(true)
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', payload)
      persistUser(data.user)
      setToken(data.token)
      localStorage.setItem('token', data.token)
      return data.user
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (
    payload: RegisterPayload,
    endpoint = '/auth/register'
  ) => {
    setIsLoading(true)
    try {
      await api.post<AuthResponse>(endpoint, payload)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch {
      // ignore logout errors
    }
    persistUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // Don't render children until auth is initialized
  if (!isInitialized && !!localStorage.getItem('token')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, register, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}