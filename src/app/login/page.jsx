"use client"

import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const username = e.target[0].value
    const password = e.target[1].value
    
    signIn("credentials", {username, password});
    router.push("/protected")
  }

  return (
    <div>
        <div>
          <form onSubmit={handleSubmit}>
               <input type='text' placeholder='username'/>
               <input type='password' placeholder='password'/>
               <button>Login</button>
          </form>
        </div>
    </div>
  )
}

export default Login