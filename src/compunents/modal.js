"use client"
import React, { useState } from 'react'
import { klasat } from '@/klasat'


// import { redirect } from 'next/navigation'

const Modal = ({ openModal, setOpenModal, data }) => {
  
   
     const [formData, setFormData] = useState({
          name: '',
          last: '',
          klasa: '',
     });
     console.log(formData);

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
     };

     const editStudent = async(e) => {
          e.preventDefault();
           const id = data._id
           console.log(id);

          try {
               const response = await fetch(`/api/students/${id}`, {
                    method: 'PUT',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                     
                    body: JSON.stringify(formData),
               });

               if (response.ok) {
                    const newStudent = await response.json();
                    console.log('Student Edited:', newStudent);
               } else {
                    console.error('Failed to edit the student');
               }
               
               setOpenModal(false)
               window.location.reload()
          } catch (error) {
               console.error('Error: from here', error);
          }


     }

     return (
          <div className='modalCon'>
               <div className='modalHead'>
               <p>{data.name}</p>
               <p>{data.last}</p>
               <p>{data.klasa}</p>
                  </div>
               <form className='modalForm'>
                    <input name='name' placeholder='Name' value={formData.name} onChange={handleInputChange} />
                    <input name='last' placeholder='Last Name' value={formData.last} onChange={handleInputChange} />

                    <select
                         name='klasa'
                         value={formData.klasa}
                         onChange={handleInputChange}
                    >
                         <option></option>
                         {klasat?.map((item, i) => (
                              <option key={i} value={item.name}>
                                   {item.name}
                              </option>
                         ))}
                    </select>
                    <div className='modalButton'>
                         <button onClick={editStudent}>Save</button>
                         <button onClick={() => { setOpenModal(false) }}>Close</button>
                    </div>

               </form>

          </div>
     )
}

export default Modal