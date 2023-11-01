import Student from "@/models/Student"
import { getSession } from 'next-auth/react';
import connect from "@/ulitis/db"
import { NextResponse } from "next/server"
// import { authOptions } from "../auth/[...nextauth]/route";



export const GET = async (request) => {
   try {

      await connect()

      const posts = await Student.find()

      return new NextResponse(JSON.stringify(posts), { status: 200 })

   } catch (err) {
      return new NextResponse("Database error, cat take data", { status: 500 })
   }
}



export const POST = async (request) => {
   try {

      const { name, last, klasa } = await request.json()
      await connect()

      const newStudent = new Student({ name, last, klasa });
      const savedStudent = await newStudent.save();

      return new NextResponse(JSON.stringify(savedStudent), { status: 201 });

   } catch (err) {
      return new NextResponse("Database error, cat take data", { status: 500 })
   }

}