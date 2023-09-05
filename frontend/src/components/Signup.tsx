import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import {
    FaEbay,
    FaEye,
    FaEyeSlash,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CenteredLayout } from '../layouts/CenteredLayout';

import { AuthAPI } from '../api/AuthAPI';
// import { Redirect } from '@/app/types';

export function Signup() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(email, password);

        try {
            e.preventDefault()
            const data = await AuthAPI.signup(email, password);
            console.log(data);
            window.location.href = '/'
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleEbayOAuth = async () => {
        // const resp = await httpClient.get<Redirect>('/authorize/ebay')
        // window.location.href = resp.data.url;
    }

    const handleGoogleOAuth = async () => {
        // const resp = await httpClient.get<Redirect>('/authorize/google')
        // window.location.href = resp.data.url;
    }

    return (
        <CenteredLayout>
            <div className='w-full max-w-sm'>
                <form
                    className='bg-white shadow-md border rounded-xl px-8 py-8'
                    onSubmit={handleSubmit}
                >
                    <h1
                        className='text-2xl font-bold mb-2'
                    >
                        Sign Up
                    </h1>
                    <p
                        className='text-sm mb-5'
                    >
                        Already have an account? <Link
                            className='text-blue-500 hover:text-blue-600'
                            to='/login'
                        >
                            Log In.
                        </Link>
                    </p>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor='email'
                        >
                            Email
                        </label>
                        <input
                            className='text-sm shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            placeholder='Email Address'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id='email'
                        />
                    </div>
                    <div className='mb-6'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor='password'
                        >
                            Password
                        </label>
                        <div className='relative'>
                            <input
                                className='shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                placeholder='Password'
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id='password'
                            />
                            <div
                                className='absolute top-4 right-1 mr-2 w-5 hover:cursor-pointer'
                                onClick={() => setShowPassword((show) => !show)}
                            >
                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </div>
                        </div>
                    </div>
                    <p
                        className='text-sm mb-6'
                    >
                        By signing up for an account, you agree to our Terms of Service and our Privacy Policy.
                    </p>
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-xl focus:outline-none focus:shadow-outline mb-4"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    <button
                        className="w-full flex items-center justify-center bg-white border hover:bg-slate-100 font-bold py-2 rounded-xl focus:outline-none focus:shadow-outline mb-4"
                        type="button"
                        onClick={handleGoogleOAuth}
                    >
                        <div
                            className='px-2'
                        >
                            <FcGoogle />
                        </div>
                        Sign Up with Google
                    </button>
                    {/* <button
                        className="w-full flex items-center justify-center bg-white border hover:bg-slate-100 font-bold py-2 rounded-xl focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleEbayOAuth}
                    >
                        <div
                            className='px-2'
                        >
                            <FaEbay />
                        </div>
                        Sign Up with eBay
                    </button> */}
                </form>
            </div>
        </CenteredLayout>
    )
}