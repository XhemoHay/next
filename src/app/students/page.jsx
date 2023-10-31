"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import styles from "./page.module.css"
import { klasat } from '@/klasat';

const Students = () => {
  const { session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/protected')
    }
  });



  const [students, setStudents] = useState([]);
  const [klasa, setKlasa] = useState("")

  const user = "male"
  const male = klasat.filter(item => item.cat === "male")
  const female = klasat.filter(item => item.cat === "female")

  const students1 = students?.filter(student => student.klasa === klasa)


  useEffect(() => {
    // Fetch data from your API
    fetch('http://localhost:3000/api/students')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Failed to fetch data:', error));

  }, []);

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

      {students1.length > 0 ? (students1?.map((student, index) => (
        <div key={index} className={styles.list}>
          <div className={styles.num}>{index + 1}</div>
          <div className={styles.info}>{student.name}</div>
          <div className={styles.info}>{student.last}</div>
          <div className={styles.info1}>Info</div>
        </div>

      ))):(
        <p>Select class!</p>
      )}


    </div>
  )

};

export default Students;





