"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from "./page.module.css"
import { klasat } from '@/klasat';


const Protected = () => {
  const { data: session, status } = useSession();

  const prof = session?.user?.name



  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }
  // if (!session) {
  //   return <div>You are not authenticated. Please log in.</div>;
  // }

  const [students, setStudents] = useState([]);
  const [klasa, setKlasa] = useState("")
  const [salah, setSalah] = useState("")
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage ,setErrorMessage] = useState("")


  const user = "male"
  const male = klasat.filter(item => item.cat === "male")
  const female = klasat.filter(item => item.cat === "female")

  const students1 = students?.filter(stud => stud.klasa === klasa)


  useEffect(() => {
    fetch('/api/students')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Failed to fetch data:', error));

  }, []);

  const handleSalah = (r) => {
    setSalah(r.target.value);
  }

  const handleMinus = async (e) => {
    // e.preventDefault()
    setIsLoading(true);
    if(!salah ){
      alert("Select Salah")
    }
    try {
      const response = await fetch('/api/salah', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ selectedStudents, salah, prof }),
      });

      if (response.ok) {
        const newStudent = await response.json();
        console.log('Student added:', newStudent);
      } else {
        console.error('Failed to add the student');
      }

    } catch (err) {
      if (err) {
        setErrorMessage('Select salah and class');
      }
      
    }
    setTimeout(() => {               
      setIsLoading(false);   
      window.location.reload()   
 }, 1500);
  }


  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prevSelectedStudents) => {
      if (prevSelectedStudents.includes(studentId)) {
        return prevSelectedStudents.filter((id) => id !== studentId);
      } else {
        return [...prevSelectedStudents, studentId];
      }
    });
  };



  return (
    <div className={styles.studentList}>

      <div>
        <select className={styles.selectSalah} onChange={handleSalah}>
          <option ></option>
          <option value="Sabah">Sabah</option>
          <option value="Podne">Podne</option>
          <option value="Ikindija">Ikindija</option>
          <option value="Aksam">Aksam</option>
          <option value="Jacija">Jacija</option>

        </select>

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

      {students1?.length > 0 ? (students1?.map((student, index) => (
        <form key={index} className={styles.list}>
          <div className={styles.num}>{index + 1}</div>
          <div className={styles.info}>{student.name.charAt(0).toUpperCase() + student.name.slice(1).toLowerCase()}</div>
          <div className={styles.info}>{student.last.charAt(0).toUpperCase() + student.last.slice(1).toLowerCase()}</div>
          
          <input type="checkbox"
            checked={selectedStudents.includes(student._id)}
            onChange={() => handleCheckboxChange(student._id)}
          />
      
        </form>


      ))) : (
        <p>Select class!</p>
      )}
      {students1?.length > 0 &&       
      <button onClick={handleMinus} disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>}



    </div>
  )
}

export default Protected