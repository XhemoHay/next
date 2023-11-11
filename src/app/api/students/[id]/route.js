import Student from "@/models/Student"
import connect from "@/ulitis/db"
import { NextResponse } from "next/server"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export const GET = async (request,{params}) => {

     const {id}= params

     try {
  
        await connect()
  
        const post = await Student.findById({_id:id})
  
        return new NextResponse(JSON.stringify(post), { status: 200 })
  
     } catch (err) {
        return new NextResponse("Database error, cat take student", { status: 500 })
     }
  }


  export const DELETE = async (request,{params}) => {

     const session = await getServerSession(authOptions)
     if (!session || session.user.role !== 'admin') {
          return new NextResponse('Unauthorized', { status: 403 });
        }

   const {id}= params

   try {

      await connect()

      const post = await Student.findByIdAndDelete({_id:id})

      return new NextResponse(JSON.stringify(post), { status: 200 })

   } catch (err) {
      return new NextResponse("Database error, cant delete student", { status: 500 })
   }
}




export const PUT = async (request,{params}) => {

   const session = await getServerSession(authOptions)
   if (!session || session.user.role !== 'admin') {
        return new NextResponse('Unauthorized', { status: 403 });
      }

   const {id}= params
    const data = await request.json()

   try {

      await connect()

      const post = await Student.findByIdAndUpdate(id, {
         $set: data
    }, { new: true })

      return new NextResponse(JSON.stringify(post), { status: 200 })

   } catch (err) {
      return new NextResponse("Database error, can't edit student", { status: 500 })
   }
}