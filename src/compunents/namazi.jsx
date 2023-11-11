"use client"
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Namazi = () => {

     const { data: session } = useSession();

     const url = useParams()
     const id = url.id

     const [salah, setSalah] = useState()
     const numOfSalah = salah?.length;

     const admin = session?.user?.role === "admin"


     useEffect(() => {
          fetch(`/api/salah/${id}`)
               .then((response) => response.json())
               .then((data) => setSalah(data))
               .catch((error) => console.error('Failed to fetch data:', error));

     }, []);

     const deleteNamaz = async (e) => {
          e.preventDefault()
          const id = e.target.value;

          try {

               const response = await fetch(`/api/salah/${id}`, {
                    method: 'DELETE',
                    // body: JSON.stringify({ id }), 
               })
               if (response.ok) {
                    // Remove the deleted user from the state
                    setSalah((prevUsers) => prevUsers.filter((user) => user._id !== id));
               } else {
                    console.error('Failed to delete Salah');
               }
               alert("Delete Salah?")
          } catch (err) {
               console.log(err);
          }

     }

     return (
          <div className='salahCon'>
               <div className='namazHeader'>
                    <h2>Izuztanci</h2>
                    <div className='numSalah'>{numOfSalah}</div>
               </div>
               {salah?.map((item) => (
                    <div className='salahInfo' key={item._id}>
                         <span><b>{new Date(item.createdAt).toDateString()}</b></span>
                         <p>{item.salah}</p>
                         {admin && <button value={item._id} onClick={deleteNamaz}>Delete</button>}
                         {admin &&<div>-/{item.prof}</div>}
                    </div>
               ))}
          </div>
     )
}

export default Namazi