import { Sidebar, SidebarItem } from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { FiGrid, FiSettings, FiBookmark } from 'react-icons/fi'
import { FaRegUserCircle } from 'react-icons/fa';
import { MdHistory } from 'react-icons/md';
import { PiGavelBold } from 'react-icons/pi';


export const SidebarLayout = () => {
    return (
        <div className='absolute flex w-full h-full '>
            <Sidebar>
                <SidebarItem to='/dashboard' icon={FiGrid} text='Dashboard' />
                <SidebarItem to='/dashboard/snipes' icon={PiGavelBold} text='Snipes' />
                <hr className='mx-3' />
                <SidebarItem to='/dashboard/bookmarks' icon={FiBookmark} text='Bookmarks' />
                <SidebarItem to='/dashboard/history' icon={MdHistory} text='History' />
                <hr className='mx-3' />
                <SidebarItem to='/dashboard/account' icon={FaRegUserCircle} text='Account' />
                <SidebarItem to='/dashboard/settings' icon={FiSettings} text='Settings' />
            </Sidebar>
            <main className='overflow-auto w-full p-3 bg-gray-100'>
                <Outlet />
            </main>
        </div>
    )
}