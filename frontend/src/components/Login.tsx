import { useContext } from 'react';
import {
    FcGoogle,
} from 'react-icons/fc';
import {
    FaEbay,
    FaEye,
    FaEyeSlash,
} from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CenteredLayout } from '../layouts/CenteredLayout'
import { AuthContext } from '../context/AuthContext';
import { User } from '../context/AuthContext';

import { AuthAPI } from '../api/AuthAPI';
import { useAuth } from '../hooks/useAuth';


export function Login() {
    const { setUser } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            console.log(email, password);

            try {
                e.preventDefault()
                const data: User = await AuthAPI.login(email, password);
                // const resp = await httpClient.post<any>('/auth/login', {
                //     email,
                //     password,
                // });
                // const data: User = await resp.data;
                console.log(data);
                setUser(data);
                // setUser({
                //     id: data.id,
                //     email: data.email,
                //     email_verified: data.email_verified,
                // });

                // window.location.href = '/';
            } catch (error: any) {
                if (error.response.status === 401)
                    alert('Invalid Credentials')
                console.log(error)
            }
    }

    return (
        <CenteredLayout>
            <div className='w-full max-w-sm'>
                <form
                    className='bg-white shadow-md border rounded-xl px-8 py-8 mb-4'
                    onSubmit={handleSubmit}
                >
                    <div>
                        <h1
                            className='text-2xl font-bold mb-2'
                        >
                            Log In
                        </h1>
                        <p
                            className='text-sm mb-5'
                        >
                            New to Jacob's App? <Link
                                className='text-blue-500 hover:text-blue-600'
                                to='/signup'
                            >
                                Sign Up.
                            </Link>
                        </p>
                    </div>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor='email'
                        >
                            Email
                        </label>
                        <input
                            className='shadow-sm appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            placeholder='Email Address'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id='email'
                        />
                    </div>
                    <div className='mb-6'>
                        <div className="flex items-center justify-between">
                            <label
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor='password'
                            >
                                Password
                            </label>
                            <Link
                                className='mb-2 text-sm text-blue-500 hover:text-blue-600'
                                to='/forgot-password'
                                tabIndex={-1}
                            >
                                <span>
                                    Forgot Password?
                                </span>
                            </Link>
                        </div>
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
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-xl focus:outline-none focus:shadow-outline mb-4"
                        type="submit"
                    >
                        Log In
                    </button>
                    <button
                        className="w-full flex items-center justify-center bg-white border hover:bg-slate-100 font-bold py-2 rounded-xl focus:outline-none focus:shadow-outline mb-4"
                        type="button"
                    >
                        <div
                            className='px-2'
                        >
                            <FcGoogle />
                        </div>
                        Sign In with Google
                    </button>
                    <button
                        className="w-full flex items-center justify-center bg-white border hover:bg-slate-100 font-bold py-2 rounded-xl focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        <div
                            className='px-2'
                        >
                            <FaEbay />
                        </div>
                        Sign In with eBay
                    </button>
                </form>
            </div>
        </CenteredLayout>
    )
}