import connect from "@/ulitis/db";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

export const authOptions = {
     providers: [
          CredentialsProvider({
               id: "credentials",
               name: "Credentials",
               credentials: {
                    username: {
                         label: "Username",
                         type: "text",
                         placeholder: "your username"
                    },
                    password: {
                         label: "Password",
                         type: "password",
                         placeholder: "your password"
                    },
               },

               async authorize(credentials) {

                    // const user = {id:"15", name:"xhemo", password:"123", role:"admin"}

                    // if(credentials?.username === user.name && credentials?.password === user.password){
                    //      return user 
                    // }else{
                    //      return null
                    // }

                    await connect();

                    try {
                         const user = await User.findOne({ username: credentials.username })

                         if (user) {
                              const isPassCorrect = await bcrypt.compare(credentials.password, user.password)

                              if (isPassCorrect) {
                                   return {
                                        role: user.role ?? "user",
                                        name: user.username,
                                        type:"male"
                                   }

                              } else {
                                   throw new Error("Wrong password")
                              }

                         } else {
                              throw new Error("User not found")
                         }

                    } catch (err) {
                         throw new Error("eroor is here")
                    }

               }
          })
     ],
     callbacks: {
          jwt({ token, user }) {
               if (user) token.role = user.role
               return token
          },
          session({ session, token }) {
               session.user.role = token.role
               return session
          }
     },
     secret: process.env.NEXTAUTH_SECRET,
     debug: process.env.NODE_ENV === "development",
     session: { strategy: "jwt" },
     // site: process.env.NEXTAUTH_URL,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }