// auth-context.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
    token: string | null;
    updateToken: (newToken: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = Cookies.get('access_token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const updateToken = (newToken: string) => {
        setToken(newToken);
        Cookies.set('access_token', newToken, {
            expires: 7,
            secure: true,
            sameSite: 'strict',
        });
    };

    return (
        <AuthContext.Provider value={{ token, updateToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
