import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface User {
    id?: string;
    name?: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    login: (token: string, user?: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: (token, user) => {
                Cookies.set('token', token, { expires: 7 }); // 7 days
                set({ token, user, isAuthenticated: true });
            },
            logout: () => {
                Cookies.remove('token');
                set({ token: null, user: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage', // unique name for localStorage
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }), // Don't persist things that are better in cookies or derived? Actually persist basic user info. Token is in cookies.
        }
    )
);
