import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    const isEmailVerified = (): boolean => {
        return user?.email_verified ? true : false;
    }

    const isEbayConnected = (): boolean => {
        return user?.ebay_user_id ? true : false;
    }

    return { user, setUser, isEmailVerified, isEbayConnected };
}