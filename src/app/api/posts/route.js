import Post from "@/models/Post"
import connect from "@/ulitis/db"
import { NextResponse } from "next/server"


export const GET = async (request) => {
   try {

      await connect()

      const posts = await Post.find()

      return new NextResponse(JSON.stringify(posts), { status: 200 })

   } catch (err) {
      return new NextResponse("Database error, cat take data", { status: 500 })
   }
}



export const POST = async (request) => {
   try {

      const { name, last } = await request.json()
      
      await connect()

      const newPost = new Post({ name, last });
      const savedPost = await newPost.save();

      return new NextResponse(savedPost, { status: 201 });

   } catch (err) {
      return new NextResponse("Database error, cat take data", { status: 500 })
   }

}