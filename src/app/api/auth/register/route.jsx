import User from "@/models/User";
import connect from "@/ulitis/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export const POST = async (request) =>{

     const {username, password, role} = await request.json();
     console.log(username, password, role);
     await connect();

     const hashedPass = await bcrypt.hash(password, 10)
     const newUser = new User({username, password:hashedPass, role})

     try{

       await newUser.save()
       return new NextResponse("User created", {status:200})

     }catch(err){
          return new NextResponse("dont work well", {status:500})
     }
}