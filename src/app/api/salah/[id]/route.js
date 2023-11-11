import Namaz from "@/models/Namaz"
import connect from "@/ulitis/db"
import { NextResponse } from "next/server"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export const GET = async (request, { params }) => {

   const { id } = params

   try {

      await connect()

      const post = await Namaz.find({ id: id }).sort({ createdAt: -1 });

      return new NextResponse(JSON.stringify(post), { status: 200 })

   } catch (err) {
      return new NextResponse("Database error, cat take student", { status: 500 })
   }
}



export const DELETE = async (request, { params }) => {

   const session = await getServerSession(authOptions)
   if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 403 });
   }

   const { id } = params
    console.log(id);
   try {

      await connect()

      const post = await Namaz.findByIdAndDelete({ _id: id })

      return new NextResponse(JSON.stringify(post), { status: 200 })

   } catch (err) {
      return new NextResponse("Database error, cant delete student", { status: 500 })
   }
}