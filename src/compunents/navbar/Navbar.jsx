"use client"

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className='navCon'>
      <div className='navItem'>
      <a href="/students">Studetns</a>
      </div>
      <div className='navItem'>
        <a href="/salah">Salah</a>
      </div>
      <div className='navItem'>
      <a href="/info">Info</a>
      </div>
      <div className='navItem' onClick={handleSignOut}><LogoutIcon style={{fontSize:"22px"}}/></div>
      {session?.user?.role === "admin" &&
        <div className='navItem'><a href="/admin">Admin</a></div>
      }

    </nav>
  );
};

export default Navbar;