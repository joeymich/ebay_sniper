import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Protected = ({ children }: any) => {
    const { user } = useContext(AuthContext);
    if (!user)
        return <Navigate to='/login' replace />;
    return children;
}