"use client"
import { useState } from 'react';
import { klasat } from '@/klasat';

const AddStudents = () => {
  const [formData, setFormData] = useState({
    name: '',
    last: '',
    klasa: '', 
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/students', {
      
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newStudent = await response.json();
        console.log('Student added:', newStudent);
      } else {
        console.error('Failed to add the student');
      }
    } catch (error) {
      console.error('Error: from here', error);
    }
  };

  return (
    <div>
      <div className='addStuddiv'>
        <form onSubmit={handleSubmit}>
          <h2>Add Student</h2>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='last'
            placeholder='Last name'
            value={formData.last}
            onChange={handleInputChange}
          />
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
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddStudents;
