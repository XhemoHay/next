"use client"

import React from 'react';
import { useSession, signOut } from 'next-auth/react';

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
        <a href="/protected">Salah</a>
      </div>
      <div className='navItem'>
      <a href="/info">Info</a>
      </div>

      {session?.user?.role === "admin" &&
        <div className='navItem'><a href="/admin">Admin</a></div>
      }
      <div className='navItem'><button onClick={handleSignOut}>Sign Out</button></div>


    </nav>
  );
};

export default Navbar;