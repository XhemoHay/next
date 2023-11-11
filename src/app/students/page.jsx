"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';
import styles from "./page.module.css"
import { klasat } from '@/klasat';
import Link from 'next/link';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

const Students = () => {
  const { data: session } = useSession();
  const admin = session?.user?.role === "admin"
  

  const [students, setStudents] = useState([]);
  const [klasa, setKlasa] = useState("")


  const user = session?.user?.type;
  const male = klasat.filter(item => item.cat === "male")
  const female = klasat.filter(item => item.cat === "female")

  const students1 = students?.filter(student => student.klasa === klasa)


  useEffect(() => {
    fetch('/api/students')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Failed to fetch data:', error));

  }, []);

  const deleteStudent = async(e) => {
    e.preventDefault()
    const id = e.target.value;
    console.log(e.target.value);

    const confirmed = window.confirm("Are you sure you want to delete this student?");

    if (!confirmed) {
        return; // Do nothing if the user cancels the deletion
      }
  
    try {    
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
        // body: JSON.stringify({ id }), 
      })
      if (response.ok) {
        // Remove the deleted user from the state
        setStudents((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } else {
        console.error('Failed to delete Student');
      }
    
    } catch (err) {
      console.log(err);
    }
  }

  return (

    <div className={styles.studentList}>

      <div>
        <select onChange={(e) => setKlasa(e.target.value)}>
          <option></option>
          {user === 'female' ? (female.map((item, i) => (
            <option key={i} value={item.name}>{item.name}</option>
          )
          )) :
            user === 'male' ? male.map((item, i) => (
              <option key={i} value={item.name}>{item.name}</option>
            ))

              : (
                klasat.map((item, i) => (
                  <option key={i} value={item.name}>{item.name}</option>
                ))
              )
          }
        </select>
      </div>

      <div className={styles.list}>
          <div className={styles.num}><b>No.</b></div>
          <div className={styles.info}><b>Name</b></div>
          <div className={styles.info}><b>Last Name</b></div>
          {admin && <div className={styles.info1}><b>Delete</b></div>}
          <div className={styles.info1}><b>Info</b></div>
        </div>

      {students1.length > 0 ? (students1?.map((student, index) => (
        <div  key={index} className={styles.list}>
          <div className={styles.num}>{index + 1}</div>
          <div className={styles.info}>{student.name.charAt(0).toUpperCase() + student.name.slice(1).toLowerCase()}</div>
          <div className={styles.info}>{student.last.charAt(0).toUpperCase() + student.last.slice(1).toLowerCase()}</div>
          {admin && (<button value={student._id} onClick={deleteStudent}>Delete</button>)}
         
          <Link href={`/students/${student._id}`} className={styles.info1}><InfoIcon /></Link>
        </div>

      ))) : (
        <p>Select class!</p>
      )}

    </div>
  )

};

export default Students;





