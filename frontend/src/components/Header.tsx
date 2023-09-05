import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export function Header() {
    const { user, setUser } = useContext(AuthContext);
    return (
        <nav
            className=''
        >
            <div
                className='max-w-7xl m-auto flex items-center gap-8 justify-between py-4 px-4'
            >
                <div
                    className='flex items-center gap-4'
                >
                    <NavLink
                        to={'/'}
                        className='text-2xl font-semibold text-black hover:opacity-90'
                    >
                        Logo
                    </NavLink>
                </div>
                <div className='flex items-center gap-20'>
                    <NavLink to='/#features' className='font-medium text-sm text-black hover:opacity-90'>
                        Features
                    </NavLink>
                    <NavLink to='/#pricing' className='font-medium text-sm text-black hover:opacity-90'>
                        Pricing
                    </NavLink>
                    <NavLink to='/#contact' className='font-medium text-sm text-black hover:opacity-90'>
                        Contact
                    </NavLink>
                </div>
                {user ? (
                    <NavLink
                        to={'/dashboard'}
                        className='font-medium text-sm text-white bg-black px-4 py-2 rounded-lg hover:opacity-90'
                    >
                        Dashboard
                    </NavLink>
                ) : (
                    <div
                        className='flex gap-4'
                    >

                        <NavLink
                            to={'/login'}
                            className='font-medium text-sm text-black px-4 py-2 rounded-lg hover:opacity-90'
                        >
                            Log In
                        </NavLink>
                        <NavLink
                            to={'/signup'}
                            className='font-medium text-sm text-white bg-black px-4 py-2 rounded-lg hover:opacity-90'
                        >
                            Sign Up
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    )
}