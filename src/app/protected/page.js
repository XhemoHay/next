"use client"
import React from 'react'
import { useSession } from 'next-auth/react';


const Protected = () => {
const { data: session, status } = useSession();


// Check if session is loading
if (status === 'loading') {
  return <div>Loading...</div>;
}

// Check if there's no session (user not authenticated)
if (!session) {
  return <div>You are not authenticated. Please log in.</div>;
}

// If you reach this point, the user is authenticated
return <div>Protected content. Welcome, !</div>;
}

export default Protected