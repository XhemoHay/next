"use client"
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

import React, { useEffect, useState } from 'react';

const Izjava = () => {

     const { data: session } = useSession();
     const prof = session?.user?.name;
     const admin = session?.user?.role === "admin"

     const url = useParams()
     const id = url.id


     

     const [izjava, setIzjavas] = useState()
     const [pisiIzjava, setPisiIzjava] = useState(false);
     const [izjavaText, setIzjavaText] = useState("");
     const numOfIzjava = izjava?.length;


     const saveIzjava = async () => {
          try {
               const response = await fetch('/api/izjava', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ izjavaText, id, prof }),
               });

               if (response.ok) {
               
                    console.log('Izjava added successfully');
                    setPisiIzjava(false)

               } else {
                    console.error('Failed to add the Izjava');
               }
          
               window.location.reload()
               
          } catch (err) {
               console.error(err);
          }

     };
 
     useEffect(() => {
          fetch(`/api/izjava/${id}`)
               .then((response) => response.json())
               .then((data) => setIzjavas(data))
               .catch((error) => console.error('Failed to fetch data:', error));
     }, [])



     const deleteIzjava = async (e) => {
          e.preventDefault()
          const id = e.target.value;

          try {

               const response = await fetch(`/api/izjava/${id}`, {
                    method: 'DELETE',
                    // body: JSON.stringify({ id }), 
               })
               if (response.ok) {
                    // Remove the deleted user from the state
                    setIzjavas((prevUsers) => prevUsers.filter((user) => user._id !== id));
               } else {
                    console.error('Failed to delete Izjava');
               }
               alert("Delete izajava?")
          } catch (err) {
               console.log(err);
          }

     }

     return (
          <div className='izjavaCon'>
               <div className='izjavaHeader'>
                    <h2>Problems</h2>
                    <div onClick={() => setPisiIzjava(true)}>pisi</div>
                    <div className='numIzjava'>{numOfIzjava}</div>
               </div>

               <div>
                    {pisiIzjava && (
                         <div className='inputIzjava'>
                              <textarea
                                   placeholder='Pisi Izjavu'
                                   rows="4"
                                   cols="30"
                                   spellCheck="false"
                                   onChange={(e) => setIzjavaText(e.target.value)}
                              />
                              <div>
                                   <button onClick={saveIzjava}>Save</button>
                                   <button onClick={() => setPisiIzjava(false)}>Exit</button>
                              </div>
                         </div>
                    )}
               </div>
               {izjava?.length > 0 ? (izjava.map((item) => (
                    <div className='izjavaInfo' key={item._id}>
                         <span><b>{new Date(item.createdAt).toDateString()}</b></span>
                         <p>{item.izjava.charAt(0).toUpperCase() + item.izjava.slice(1).toLowerCase()}</p>
                         {admin && <button value={item._id} onClick={deleteIzjava}>Delete</button>}
                         {admin &&<div>-/{item.prof}</div>}

                    </div>
               ))) : (
                    <div className='izjavaInfo'>No problems!</div>
               )}

          </div>
     );
};

export default Izjava;
