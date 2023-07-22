import { getUserData } from '@/APIs/userApi'
import { scopes } from '@/config/spotify'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ImageSource, countries } from '../../types'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContext {
  isLogged: boolean
  userData?: UserData
  handleLogin: () => void
  handleLogout: () => void
}

interface UserData {
  display_name?: string
  id?: string
  images?: ImageSource[]
  email?: string
  country?: countries
  followers?: { total?: number }
}

export const AuthContext = createContext({} as AuthContext)

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // --------Constants-------------------
  const END_POINT = 'https://accounts.spotify.com/authorize'
  const RESPONSE_TYPE = 'code'
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
  const SCOPE = scopes
  const REDIRECT_URI = `${window.location.origin}/`

  const [authCode, setAuthCode] = useState<string>('')
  const refreshToken = localStorage.getItem('spotify_refresh_token')
  const [isLogged, setLogged] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserData>()

  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('code', authCode)
  params.append('redirect_uri', REDIRECT_URI)
  params.append('client_id', CLIENT_ID)
  params.append('client_secret', CLIENT_SECRET)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const search = location.search.split('=')
    if (search[0] === '?code') {
      setAuthCode(search[1])
    }
  }, [])

  useEffect(() => {
    const fetchAuth = async () => {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: params,
      })

      const data = await response.json()
      console.log(data)
      const currentTime = new Date()
      localStorage.setItem('spotify_refresh_token', data?.refresh_token)
      localStorage.setItem('spotify_access_token', data?.access_token)
      localStorage.setItem('spotify_access_token_at', JSON.stringify(currentTime))
      setLogged(true)
    }

    if (refreshToken && refreshToken !== 'undefined') {
      setLogged(true)
    } else if (authCode) {
      fetchAuth()
    }
  }, [authCode])

  useEffect(() => {
    navigate({ search: '' })
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData()
      setUserData(data)
    }
    fetchUserData()
  }, [isLogged])

  const handleLogin = (): void => {
    window.location.replace(
      `${END_POINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
    )
  }

  console.log(userData)

  const handleLogout = () => {
    localStorage.removeItem('spotify_refresh_token')
    localStorage.removeItem('spotify_access_token')
    localStorage.removeItem('spotify_access_token_at')
    setLogged(false)
  }

  return (
    <AuthContext.Provider value={{ isLogged, handleLogin, userData, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}
