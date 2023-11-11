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
                         
                    },
                    password: {
                         label: "Password",
                         type: "password",
                    },
               },

               async authorize(credentials) {

                    await connect();

                    try {
                         const user = await User.findOne({ username: credentials.username })

                         if (user) {
                              const isPassCorrect = await bcrypt.compare(credentials.password, user.password)
                              
                              if (isPassCorrect) {
                                   return {
                                        role: user.role ?? "user",
                                        type: user.type ?? "male",
                                        name: user.username
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
     // callbacks: {
     //      jwt({ token, user }) {
     //           if (user) token.role = user.role
     //           return token
     //      },
     //      session({ session, token }) {
     //           session.user.role = token.role
     //           return session
     //      }
     // },
     callbacks: {
          jwt({ token, user }) {
            if (user) {
              token.role = user.role;
              token.type = user.type;
            }
            return token;
          },
          session({ session, token }) {
            session.user.role = token.role;
            session.user.type = token.type; // Include the 'type' property in the session
            return session;
          }
        },
     secret: process.env.NEXTAUTH_SECRET,
     // debug: process.env.NODE_ENV === "development",
     session: { strategy: "jwt" },
     // site: process.env.NEXTAUTH_URL,
     // pages: {
     //      signIn: "/login"
     // }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }