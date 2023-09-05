import React from 'react';
import { FiLogOut } from 'react-icons/fi'
import { LuChevronFirst, LuChevronLast } from 'react-icons/lu';

import { NavLink } from 'react-router-dom';

import { useContext, createContext, useState } from 'react';

import { IconType } from 'react-icons/lib';

interface ISidebarContext {
    open: boolean;
}

const defaultState = {
    open: false,
};

const SidebarContext = createContext<ISidebarContext>(defaultState);

interface ISidebar {
    children: JSX.Element[];
}

export function Sidebar({ children }: ISidebar) {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <aside className='h-screen'>
            <nav className='h-full flex flex-col border-r shadow-sm text-gray-600'>
                <div className='p-3 flex justify-between items-center'>
                    {/* <img
                        src='https://asset.brandfetch.io/idfGjoDDfo/idGLhETxky.png'
                        className={`overflow-hidden transition-all ${open ? 'w-32' : 'w-0'
                            }`}
                        alt=''
                    /> */}
                    <p
                        className={`overflow-hidden transition-all font-bold text-xl ${open ? 'w-32' : 'w-0'}`}
                    >
                        Logo
                    </p>
                    <button
                        className='p-2 rounded-md bg-gray-50 hover:bg-gray-100'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <LuChevronFirst size={28} /> : <LuChevronLast size={28} />}
                    </button>
                </div>
                <div className='px-3'>
                    <hr />
                </div>
                <SidebarContext.Provider value={{ open }}>
                    <ul className='flex-1'>
                        {children}
                    </ul>
                </SidebarContext.Provider>
                <div className='px-3'>
                    <hr />
                </div>
                <div className='flex p-3'>
                    <img
                        src='https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true'
                        alt=''
                        className={`${open ? 'w-10 h-10' : 'w-0'} transition-all h-10 rounded-md`}
                    />
                    <div
                        className={`
              flex justify-between items-center
              overflow-hidden transition-all ${open ? 'w-40 ml-3' : 'w-0'}
          `}
                    >
                        <div className='leading-4'>
                            <h4 className='font-semibold'>John Doe</h4>
                            <span className='text-xs text-gray-600'>johndoe@gmail.com</span>
                        </div>
                    </div>
                    <div
                        className='relative flex items-center p-2 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600'
                        onClick={() => {
                            console.log('log out');
                        }}
                    >
                        <FiLogOut size={28} />
                        <div
                            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-50 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                        >
                            Logout
                        </div>
                    </div>

                </div>
            </nav>
        </aside>
    )
}

interface ISidebarItem {
    icon: IconType;
    text: string;
    to: string;
    alert?: boolean;
}

export function SidebarItem({ icon, text, to, alert }: ISidebarItem) {
    const { open } = useContext(SidebarContext);
    return (
        <li>
            <NavLink
                to={to}
                end
                className={({ isActive }) => `relative m-3 flex items-center p-2 font-medium rounded-md cursor-pointer transition-colors group ${isActive ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800' : 'hover:bg-indigo-50'}`}
            >
                {React.createElement(icon, { size: '28' })}
                {/* {icon} */}
                <p
                    className={`overflow-hidden transition-all ${open ? 'w-40 ml-3' : 'w-0'}`}
                >
                    {text}
                </p>
                {alert && (
                    <div
                        className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${open ? "" : "top-2"}`}
                    />
                )}
                {!open && (
                    <div
                        className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-50 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                    >
                        {text}
                    </div>
                )}
            </NavLink>
        </li>
    )
}
