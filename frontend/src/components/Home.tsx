import { Header } from './Header';
import { useEffect, useState } from 'react';
import httpClient from '../httpClient';

export function Home() {
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const fetchUser = async () => {

            const resp = await httpClient.get('/auth/user');
            const json = await resp.data;
            console.log(json);
            setUser(json);
        }

        fetchUser().catch(console.error);
    }, []);

    return (
        <div>
            <Header />
            <main className='bg-green-100 max-w-7xl m-auto'>
                <p>not logged in</p>
                <p>logged in</p>
                {user && <>
                    <p>email: {user.email}</p>
                    <p>email_verified: {user.email_verified ? 'true' : 'false'}</p>
                    <p>created_at: {user.created_at}</p>
                    <p>ebay id: {user.ebay_user_id}</p>
                    <p>refresh token: {user.ebay_refresh_token}</p>
                </>}
                {/* <p>email: {user.email}</p>
                <p>email_verified: {user.email_verified}</p> */}
            </main>
        </div>
    )
}