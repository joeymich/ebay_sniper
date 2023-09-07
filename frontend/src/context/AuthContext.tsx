import React, { createContext, useState, useEffect } from 'react';
import { AuthAPI } from '../api/AuthAPI';

export interface User {
    id: string;
    email: string;
    email_verified: boolean;
    ebay_user_id: string;
}

interface AuthContext {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContext>({
    user: null,
    setUser: () => {},
});

const getInitialState = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
}

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(getInitialState);

    useEffect(() => {
        const getUser = async () => {
            try {
                const data: User = await AuthAPI.getUser();
                setUser(data);
            } catch (e: any) {
                if (e?.response?.status === 401)
                    setUser(null);
                console.error(e)
            }
        }
        getUser();
        return () => {
            // called when the component unmounts
        };
    }, [])

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
