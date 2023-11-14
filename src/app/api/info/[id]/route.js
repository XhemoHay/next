import Student from "@/models/Student"
import Izjava from "@/models/Izjava"
import Namaz from "@/models/Namaz"
import connect from "@/ulitis/db"
import { NextResponse } from "next/server"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export const GET = async (request, { params }) => {

   const { id } = params

   try {
      await connect()

      let students;
      if(id === "all"){
          students  = await Student.find()
         
      }else{
          students  = await Student.find({klasa:{$in:[id],}})
      }

      const studentsWithCounts = await Promise.all(
          students.map(async (student) => {
             const namaziCount = await Namaz.countDocuments({ id: student._id });
             const izjavaCount = await Izjava.countDocuments({ id: student._id });
             const totalCount = namaziCount + izjavaCount;

             return { ...student.toObject(), namaziCount, izjavaCount, totalCount  };



          })
       );

       const sortedStudents = studentsWithCounts.sort((a, b) => b.totalCount - a.totalCount);

      return new NextResponse(JSON.stringify(sortedStudents), { status: 200 })

   } catch (err) {
      return new NextResponse("Database error, cat take student", { status: 500 })
   }
}