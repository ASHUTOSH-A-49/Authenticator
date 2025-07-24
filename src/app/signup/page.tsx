"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function SignupPage(){

        //  creating a router to route user from signup to login 
        const router = useRouter();
        // taking user data
        const [user,setUser] = React.useState({
                
                email:"",
                password:"",
                username:"",
        })

        const [buttonDisabled,setButtonDisabled] = React.useState(false);
        const [loading,setLoading] = React.useState(false);

        const onSignup = async () =>{
                // to take the data and then perfom signup 

                try {
                     setLoading(true);
                     const response = await axios.post("/api/users/signup",user)   

                     console.log("Signup success!!",response.data);
                     router.push("/login")//after signup router pushes user to /login page
                } catch (error:any) {
                        console.log("Signup failed",error.message)
                        toast.error(error.message) 
                }finally{
                        setLoading(false);
                }

        }

        useEffect(()=>{
                if(user.email.length>0 && user.password.length>0 && user.username.length>0){
                        setButtonDisabled(false);
                }else{
                        setButtonDisabled(true);
                }
        },[user])
        return(
                <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
                        <h1>{loading?"Processing":"Signup"}</h1>
                        <hr />
                        <label htmlFor="username">Username</label>
                        <input
                        className="py-1.5 border mb-4 rounded-lg text-center text-black bg-white"
                         type="text"
                         id = "username"
                         value = {user.username}
                         onChange={(e)=>setUser({...user,username:e.target.value})}
                         placeholder="username"
                         />
                        <label htmlFor="email">email</label>
                        <input
                        className="py-1.5 border mb-4 rounded-lg text-center text-black bg-white"
                         type="text"
                         id = "email"
                         value = {user.email}
                         onChange={(e)=>setUser({...user,email:e.target.value})}
                         placeholder="email"
                         />
                        <label htmlFor="password">password</label>
                        <input
                        className="py-1.5 border mb-4 rounded-lg text-center text-black bg-white"
                         type="password"
                         id = "password"
                         value = {user.password}
                         onChange={(e)=>setUser({...user,password:e.target.value})}
                         placeholder="password"
                         />


                         <button
                         onClick={onSignup}
                         className="p-1 mb-2 border border-gray-300 focus:outline-none rounded-lg cursor-pointer bg-green-400 text-black hover:bg-green-600 transition delay-50 duration-300 ease-in-out hover:scale-110 px-2"
                         >{buttonDisabled?"No Signup":"Signup"}</button>
                         <Link href="/login">already an user? Login here </Link>
                </div>
        )
         
}