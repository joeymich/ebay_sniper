import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login'
import { Signup } from './components/Signup';
import { VerifyEmail } from './components/VerifyEmail';
import { Home } from './components/Home';
import { SidebarLayout } from './layouts/SidebarLayout';

import { Account } from './dashboard/Account';
import { Snipes } from './dashboard/Snipes';
// import { Snipes } from './dashboard/Snipe';


function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<SidebarLayout />} >
          <Route path='/dashboard' element={<p>Dashboard</p>}/>
          <Route path='/dashboard/snipes' element={<Snipes />} />
          <Route path='/dashboard/bookmarks' element={<p>Bookmarks</p>} />
          <Route path='/dashboard/history' element={<p>History</p>} />
          <Route path='/dashboard/account' element={<Account />} />
          <Route path='/dashboard/settings' element={<p>Settings</p>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
