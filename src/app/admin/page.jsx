import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import AddStudents from '@/compunents/addStud'
import AddUser from '@/compunents/addUser'
import UserList from '@/compunents/userList'
import styles from "./page.module.css"



export default async function Admin() {
     const session = await getServerSession(authOptions)
     // if(!session){
     //      return <h2>You dont have key for this page</h2>
     // }
     if (session?.user?.role !== "admin") {
          return (
               <h2>You cant seee this!</h2>
          )
     }


     return (
          <div className={styles.admin}>
               <div >
                    <AddStudents />
                    <AddUser />
               </div>
               <div>
                    <UserList/>
               </div>

          </div>
     )
}






