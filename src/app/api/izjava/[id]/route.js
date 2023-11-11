import Izjava from "@/models/Izjava"
import connect from "@/ulitis/db"
import { NextResponse } from "next/server"

export const GET = async (request,{params}) => {

     const {id}= params
     
     try {
  
        await connect()
  
        const post = await Izjava.find({id:id}).sort({ createdAt: -1 });
  
        return new NextResponse(JSON.stringify(post), { status: 200 })
  
     } catch (err) {
        return new NextResponse("Database error, cat take student", { status: 500 })
     }
  }


  export const DELETE = async (request,{params}) => {

   const {id}= params
   
   try {

      await connect()

      const post = await Izjava.findByIdAndDelete({_id:id})

      return new NextResponse(JSON.stringify(post), { status: 200 })

   } catch (err) {
      return new NextResponse("Database error, cant delete Izjava", { status: 500 })
   }
}