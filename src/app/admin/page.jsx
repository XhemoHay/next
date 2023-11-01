import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import AddStudents from '@/compunents/AddStudents'


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
          <div>
          <AddStudents/>
          </div>
     )
}






