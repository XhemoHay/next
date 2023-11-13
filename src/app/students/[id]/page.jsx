
"use client"
import { notFound } from 'next/navigation'
import React, { useState, useEffect } from 'react';
import styles from './page.module.css'
import Izjava from '@/compunents/izjava'
import Namazi from '@/compunents/namazi'
import Modal from "@/compunents/modal"
import { useSession } from 'next-auth/react';


async function getData(id) {
     const res = await fetch(`/api/students/${id}`)
     if (!res.ok) {
          return notFound()
     }
     return res.json()
}

const Student = ({ params }) => {

     const { data: session } = useSession();
     const admin = session?.user?.role === "admin"

     const [data, setData] = useState(null);
     const [openModal, setOpenModal] = useState(false)

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const result = await getData(params.id);
                    setData(result);
               } catch (error) {
                    console.error(error);
               }
          };
          fetchData();
     }, [params.id]);





     return (
          <div className={styles.contanier}>
               {data ? (
                    <div className={styles.wraper}>
                         <h1>{data.name}  {data.last}</h1>
                         {admin && <button onClick={() => {setOpenModal(true)}}>Edit</button>}
                         <div className={styles.info}>
                              <div className={styles.izjava}>
                                   <Izjava />
                              </div>
                              <div className={styles.namaz}>
                                   <Namazi />
                              </div>
                         </div>
                         {openModal && <div><Modal openModal={openModal}  setOpenModal={setOpenModal} data={data}/></div>}
                    </div>
               ) : (
                    <p>Loading...</p>
               )}
          </div>
     );
};

export default Student