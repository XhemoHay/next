import Student from "@/models/Student"
import Izjava from "@/models/Izjava"
import connect from "@/ulitis/db"
import { NextResponse } from "next/server"



export const POST = async (request) => {
     try {
       const { izjavaText, id, prof } = await request.json();
      
   
       await connect();
   
       const foundStudent = await Student.findOne({ _id: id });
       
       if (!foundStudent) {
         return new NextResponse("Student not found", { status: 404 });
       }
   
       const newIzjava = new Izjava({
         izjava: izjavaText,
         id,
         name: foundStudent.name,
         last: foundStudent.last,
         prof,
       });
       await newIzjava.save();
   
       return new NextResponse(JSON.stringify("dobro je"), { status: 201 });
     } catch (err) {
       console.error(err);
       return new NextResponse("Database error, couldn't save Izjava", { status: 500 });
     }
   };