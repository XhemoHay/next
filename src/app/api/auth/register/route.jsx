import User from "@/models/User";
import connect from "@/ulitis/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { authOptions } from '../[...nextauth]/route'
import { getServerSession } from 'next-auth'

export const POST = async (request) =>{

     const session = await getServerSession(authOptions)
     if (!session || session.user.role !== 'admin') {
          return new NextResponse('Unauthorized', { status: 403 });
        }


     const {username, password, role, type} = await request.json();
    
     await connect();

     const hashedPass = await bcrypt.hash(password, 10)
     const newUser = new User({username, password:hashedPass, role, type})

     try{

       await newUser.save()
       return new NextResponse(JSON.stringify("User Added"), {status:200})

     }catch(err){
        
          return new NextResponse("dont work well", {status:500})
     }
}

export const GET =  async(request)=>{
     const session = await getServerSession(authOptions)
     

     if (!session || session.user.role !== 'admin') {
          return new NextResponse('Unauthorized', { status: 403 });
        }

     try{
          await connect()

          const users = await User.find({}, { password: 0 })
         
          return new NextResponse(JSON.stringify(users), { status: 200 })
          
     }catch(err){
          console.log(err);
     }

}

export const DELETE = async (request) => {

     const url =  await request.json();
     const id = await url.id
     console.log(id);

     try {
  
        await connect()
  
        const deletedUser = await User.findByIdAndDelete(id); // Use findByIdAndDelete

        if (deletedUser) {
          return new NextResponse(JSON.stringify(deletedUser), { status: 200 });
        } else {
          return new NextResponse("User not found", { status: 404 }); // Return a 404 status if user not found
        }
  
     } catch (err) {
        return new NextResponse("Database error, cat take student", { status: 500 })
     }
  }