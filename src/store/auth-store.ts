import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'

interface User {
  id?: string
  name?: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  login: (token: string, user?: User, rememberMe?: boolean) => void
  logout: () => void
  isAuthenticated: boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (token, user, rememberMe = false) => {
        const cookieOptions = rememberMe ? { expires: 7 } : {}
        Cookies.set('token', token, cookieOptions)
        set({ token, user, isAuthenticated: true })
      },
      logout: () => {
        Cookies.remove('token')
        set({ token: null, user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
