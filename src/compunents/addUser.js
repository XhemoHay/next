"use client"
import { useState } from 'react';

const AddStudents = () => {
     const [formData, setFormData] = useState({
          username: '',
          password: '',
          role: '',
          type: '',
     });


     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
     };

     const handleSubmit = async () => {

          try {
               await fetch('/api/auth/register', {

                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(formData),
               });

               //  if (response.ok) {
               //    const newStudent = await response.json();
               //    console.log('User added:', newStudent);
               //  } else {
               //    console.error('Failed to add the User');
               //  }
               alert('User added successfully');
          } catch (error) {
               console.error('Error: from here', error);
          }
     };

     return (
          <div>
               <div className='addStuddiv'>
                    <form onSubmit={handleSubmit}>
                         <h2>Add User</h2>
                         <input
                              type='text'
                              name='username'
                              placeholder='Username'
                              value={formData.name}
                              onChange={handleInputChange}
                         />
                         <input
                              type='password'
                              name='password'
                              placeholder='Password'
                              value={formData.password}
                              onChange={handleInputChange}
                         />
                         <select
                              name='role'
                              value={formData.role}
                              onChange={handleInputChange}
                         >
                              <option></option>
                              <option>admin</option>
                              <option>user</option>
                              <option>super</option>

                         </select>

                         <select name='type' value={formData.type} onChange={handleInputChange}          >
                              <option></option>
                              <option>male</option>
                              <option>female</option>
                              <option>all</option>


                         </select>
                         <button>Add</button>
                    </form>
               </div>
          </div>
     );
};

export default AddStudents;
