import { OAuthAPI } from '../api/OAuthAPI';
import { useAuth } from '../hooks/useAuth';

import {
    FcGoogle,
} from 'react-icons/fc';
import {
    FaEbay,
} from 'react-icons/fa';

interface Redirect {
    url: string;
}

export function Account() {
    const { user } = useAuth();
    const handleEbayOAuth = async () => {
        const data = await OAuthAPI.authorizeEbay();
        // const resp = await api.get<Redirect>('oauth/authorize/ebay')
        window.location.href = data.url;
    }
    return (
        <>
        <h1 className='text-3xl font-semibold'>Account</h1>
            <div className='w-full bg-white rounded-md px-8 py-7 border border-solid border-slate-300 mb-8'>
                <h2 className='text-xl font-semibold'>Profile</h2>
                <hr className='my-4' />
                <div className='flex'>
                    <p>Contact Email</p>
                    <div className='flex items-center'>
                        <p>{user?.email}</p>
                        <button className='p-1 rounded border'>Edit</button>
                    </div>
                </div>
                <div className='flex'>
                    <p>Google Login</p>
                    <button
                        className='flex items-center p-1 rounded border'
                    >
                        <FcGoogle />
                        Connect Google
                    </button>
                </div>
                <div className='flex'>
                    <p>eBay Login</p>
                    <button
                        className='flex items-center p-1 rounded border'
                    >
                        <FaEbay />
                        Connect eBay
                    </button>
                </div>
                <button className='p-1 rounded border'>Save Changes</button>
            </div>
            <div className='w-full bg-white rounded-md px-8 py-7 border border-solid border-slate-300 mb-8'>
                <h2 className='text-xl font-semibold'>Security</h2>
                <hr />
                <div className='flex'>
                    <p>Password</p>
                    <button
                        className='p-1 rounded border'
                    >
                        Change Password
                    </button>
                </div>
            </div>
            <div className='w-full bg-white rounded-md px-8 py-7 border border-solid border-slate-300 mb-8'>
                <h2 className='text-xl font-semibold'>Notifications</h2>
                <hr />
                <div className='flex'>
                    <p>notification email</p>
                    <p>jacob@jacobimmich.com</p>
                </div>
                <div className='flex items-center'>
                    <input
                        type='checkbox'
                    />
                    <p>Won Auctons</p>
                </div>
                <div className='flex items-center'>
                    <input
                        type='checkbox'
                    />
                    <p>Lost Auctons</p>
                </div>
                <button className='p-1 rounded border'>Save Changes</button>
            </div>
            <button
                className='bg-red-400 hover:bg-red-500 px-4 py-3 text-white rounded-md text-sm font-bold'
                onClick={() => console.log('delete account')}
            >
                Delete Account
            </button>
            <div>
                <button
                    className="flex items-center justify-center bg-white border hover:bg-slate-100 font-bold py-2 px-3 rounded-xl focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleEbayOAuth}
                >
                    <div
                        className='px-2'
                    >
                        <FaEbay />
                    </div>
                    Connect eBay Account
                </button>
            </div>
        </>
    )
}