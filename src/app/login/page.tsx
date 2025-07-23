"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import {axios} from "axios";




export default function LoginPage(){

        // taking user data 

        const [user,setUser] = React.useState({
                email:"",
                password:"",
                username:"",
        })


        const onSignup = async () =>{
                // to take the data and then perfom signup 
        }
        return(
                <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
                        <h1>Login</h1>
                        <hr />
                        
                        <label htmlFor="email">email</label>
                        <input
                        className="py-1.5 border mb-4 rounded-lg text-center bg-white text-black"
                         type="text"
                         id = "email"
                         value = {user.email}
                         onChange={(e)=>setUser({...user,email:e.target.value})}
                         placeholder="email"
                         />
                        <label htmlFor="password">password</label>
                        <input
                        className="py-1.5 border mb-4 rounded-lg text-center bg-white text-black"
                         type="password"
                         id = "password"
                         value = {user.password}
                         onChange={(e)=>setUser({...user,password:e.target.value})}
                         placeholder="password"
                         />


                         <button
                         onClick={onSignup}
                         className="p-1 mb-2 border border-gray-300 focus:outline-none rounded-lg cursor-pointer bg-green-400 text-black hover:bg-green-600 transition delay-50 duration-300 ease-in-out hover:scale-110 px-2"
                         >Login</button>
                         <Link href="/signup">new user? Signup here
                         </Link>
                </div>
        )
    }