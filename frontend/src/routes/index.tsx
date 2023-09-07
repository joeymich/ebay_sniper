import { useContext } from 'react';
import { useRoutes } from 'react-router-dom';

import { Login } from '../components/Login'
import { Signup } from '../components/Signup';
import { VerifyEmail } from '../components/VerifyEmail';
import { Home } from '../components/Home';
import { SidebarLayout } from '../layouts/SidebarLayout';

import { Dashboard } from '../dashboard/Dashboard';
import { Snipes } from '../dashboard/Snipes';
import { Account } from '../dashboard/Account';

import { AuthContext } from '../context/AuthContext';

import { Protected } from './Protected';
export const AppRoutes = () => {
    const { user } = useContext(AuthContext);

    const routes = [
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <Signup /> },
        { path: '/verify-email', element: <VerifyEmail /> },
        { path: '/', element: <Home /> },
        {
            path: '/dashboard',
            element: <Protected><SidebarLayout /></Protected>,
            children: [
                { path: '/dashboard', element: <Dashboard /> },
                { path: '/dashboard/snipes', element: <Snipes />},
                { path: '/dashboard/bookmarks', element: <p>Bookmarks</p> },
                { path: '/dashboard/history', element: <p>History</p> },
                { path: '/dashboard/account', element: <Account /> },
                { path: '/dashboard/settings', element: <p>Settings</p> },
            ],
        },
    ]

    return <>{useRoutes(routes)}</>
}