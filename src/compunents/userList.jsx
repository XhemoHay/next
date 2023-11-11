"use client"
import React, { useEffect, useState } from 'react'



const UserList = () => {

  const [users, setUsers] = useState()


  useEffect(() => {
    fetch('/api/auth/register')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Failed to fetch data:', error));

  }, []);


  const deleteUser = async (e) => {
    e.preventDefault()
    const id = e.target.value;
    try {
      const response = await fetch(`/api/auth/register`, {
        method: 'DELETE',
        body: JSON.stringify({ id }), 
      })
      if (response.ok) {
        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } else {
        console.error('Failed to delete user');
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='wraperUserList'>
      <h2>List of Users</h2>
      {users?.map((item, i) => (
        <div className='userList' key={i}>
          <span>{i + 1}</span>
          <p>{item.username}</p>
          <p>{item.role}</p>
        <p>{item.type}</p>
          <button value={item._id} onClick={deleteUser}>Delete</button>
        </div>

      ))}

    </div>
  )
}

export default UserList