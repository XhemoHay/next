"use client"
import React, { useEffect, useState } from 'react'
import { klasat } from '@/klasat';
import { useSession } from 'next-auth/react';
import styles from "./page.module.css"
import Link from 'next/link';
import InfoIcon from '@mui/icons-material/Info';

const Info = () => {

     const { data: session } = useSession();
     const admin = session?.user?.role === "admin"

     const [students, setStudents] = useState([]);
     const [klasa, setKlasa] = useState("a")
     const id = klasa;

     const user = session?.user?.type;

     const male = klasat.filter(item => item.cat === "male")
     const female = klasat.filter(item => item.cat === "female")
   
     // const students1 = students?.filter(student => student.klasa === klasa)
   
   
     useEffect(() => {
     
       fetch(`/api/info/${id}`)
         .then((response) => response.json())
         .then((data) => setStudents(data))
         .catch((error) => console.error('Failed to fetch data:', error));
   
     }, [id]);
   


   
   
     return (
   
       <div className={styles.studentList}>
          
         <div>
           <select onChange={(e) => setKlasa(e.target.value)}>
             <option></option>
             {user === "all" && <option>all</option>}
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

         <div   className={styles.list}>
             <div className={styles.num}><b>No.</b></div>
             <div className={styles.info}><b>Name</b></div>
             <div className={styles.info}><b>Last name</b></div>
             <div className={styles.info1}><b>Prob.</b></div>
             <div className={styles.info1}><b>Salah</b></div>
             <div className={styles.info1}><b>Info</b></div>
           </div>
   
         {students.length > 0 ? (students?.map((student, index) => (
           <div  key={index} className={styles.list}>
             <div className={styles.num}>{index + 1}</div>
             <div className={styles.info}>{student.name.charAt(0).toUpperCase() + student.name.slice(1).toLowerCase()}</div>
             <div className={styles.info}>{student.last.charAt(0).toUpperCase() + student.last.slice(1).toLowerCase()}</div>
             <div className={styles.info1}>{student.izjavaCount}</div>
             <div className={styles.info1}>{student.namaziCount}</div>
             <Link href={`/students/${student._id}`} className={styles.info1}><InfoIcon/></Link>
           </div>
   
         ))) : (
           <p>Select class!</p>
         )}
   
       </div>
     )
}

export default Info