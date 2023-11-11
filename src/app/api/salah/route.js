import Student from "@/models/Student"
import Namaz from "@/models/Namaz"
import { getSession } from 'next-auth/react';
import connect from "@/ulitis/db"
import { NextResponse } from "next/server"
// import { authOptions } from "../auth/[...nextauth]/route";



export const POST = async (request) => {
     try {

          const { selectedStudents, salah, prof } = await request.json()

          await connect()

          const foundStudents = await Student.find({ _id: { $in: selectedStudents } });

          const savedSalahPromises = foundStudents.map(async (student) => {
            const { name, last } = student; 
            const newSalah = new Namaz({ salah, id: student._id, name, last, prof });
            return newSalah.save(); 
          });
      
          const savedSalahs = await Promise.all(savedSalahPromises);

          return new NextResponse(JSON.stringify(savedSalahs), { status: 201 });

     } catch (err) {
          return new NextResponse("Database error, cat take data", { status: 500 })
     }

}