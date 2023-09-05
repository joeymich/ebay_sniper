import { Header } from './Header';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export function Home() {
    const { user, setUser } = useAuth();
    // const [user, setUser] = useState<any>(null);
    // useEffect(() => {
    //     const fetchUser = async () => {

    //         const resp = await httpClient.get('/auth/user');
    //         const json = await resp.data;
    //         console.log(json);
    //         setUser(json);
    //     }

    //     fetchUser().catch(console.error);
    // }, []);

    const [loggedIn, setLoggedIn ] = useState<boolean>(false);
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const resp = await httpClient.get('/auth/user');
    //         const json = await resp.data;
    //         console.log(json);
    //     }
    //     fetchUser().catch(console.error);
    // });

    return (
        <div>
            <Header />
            <main className='max-w-7xl m-auto'>
                <p>not logged in</p>
                <p>logged in</p>
                <p>{user ? 'not null' : 'null'}</p>
                <button
                    className='bg-blue-600 text-white p-2 rounded'
                    onClick={() => {
                            setUser({
                                id: '1234',
                                email: 'admin@admin.com',
                                email_verified: false,
                            })
                    }}
                >
                    set user
                </button>
                <button
                    className='bg-red-600 text-white p-2 rounded'
                    onClick={() => {
                        setUser(null);
                    }}
                >
                    Log out
                </button>
                {user !== null && <>
                    <p>id: {user.id}</p>
                    <p>email: {user.email}</p>
                    {/* <p>email_verified: {user.email_verified ? 'true' : 'false'}</p>
                    <p>created_at: {user.created_at}</p>
                    <p>ebay id: {user.ebay_user_id}</p>
                    <p>refresh token: {user.ebay_refresh_token}</p> */}
                </>}
                {/* <p>email: {user.email}</p>
                <p>email_verified: {user.email_verified}</p> */}
            </main>
        </div>
    )
}