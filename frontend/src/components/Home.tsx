import { Header } from './Header';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export function Home() {
    const { user, setUser, isEmailVerified, isEbayConnected } = useAuth();

    const [loggedIn, setLoggedIn] = useState<boolean>(false);


    return (
        <div>
            <Header />
            <main className='max-w-7xl m-auto'>
                <p>not logged in</p>
                <p>logged in</p>
                <p>{user ? 'not null' : 'null'}</p>
                {user && <>
                    <p>id: {user.id}</p>
                    <p>email: {user.email}</p>
                    <p>email_verified: {user.email_verified ? 'true' : 'false'}</p>
                    <p>ebay user id: {user.ebay_user_id}</p>
                    <p>{isEmailVerified() ? 'email is verified' : 'email is not verified'}</p>
                    <p>{isEbayConnected() ? 'ebay is connected' : 'ebay is not connected'}</p>
                </>
                }
            </main>
        </div>
    )
}