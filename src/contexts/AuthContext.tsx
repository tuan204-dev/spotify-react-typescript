import { getRefreshToken } from '@/apis/getRefreshToken'
import { getUserData } from '@/apis/userApi'
import { END_POINT, REDIRECT_URI, RESPONSE_TYPE, SCOPE } from '@/constants/auth'
import { UserData } from '@/types/user'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContext {
  isLogged: boolean
  userData?: UserData
  handleLogin: () => void
  handleLogout: () => void
}

export const AuthContext = createContext({} as AuthContext)

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const refreshToken = localStorage.getItem('spotify_refresh_token')
  const authCode = localStorage.getItem('spotify_auth_code')

  const [isLogged, setLogged] = useState<boolean>(Boolean(refreshToken))
  const [userData, setUserData] = useState<UserData>({})

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const search = location.search.split('=')
    if (search[0] === '?code') {
      localStorage.setItem('spotify_auth_code', search[1])
      navigate({ search: '' })
    }
  }, [])

  useEffect(() => {
    if (authCode && !isLogged) {
      const handleAuth = async () => {
        const { status } = await getRefreshToken()
        if (status) {
          setLogged(true)
        } else setLogged(false)
      }
      handleAuth()
    }
  }, [authCode])

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData()
      setUserData(data)
    }
    if (isLogged) {
      fetchUserData()
    }
  }, [isLogged])

  // handle login to get auth code
  const handleLogin = (): void => {
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    window.location.replace(
      `${END_POINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
    )
  }

  const handleLogout = () => {
    localStorage.removeItem('spotify_refresh_token')
    localStorage.removeItem('spotify_access_token')
    localStorage.removeItem('spotify_access_token_at')
    localStorage.removeItem('spotify_auth_code')
    localStorage.removeItem('spotify_current_track')
    setLogged(false)
    window.location.reload()
  }

  return (
    <AuthContext.Provider value={{ isLogged, handleLogin, userData, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}
