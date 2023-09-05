import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

type AppProviderProps = {
    children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <AuthProvider>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </AuthProvider>
    )
}