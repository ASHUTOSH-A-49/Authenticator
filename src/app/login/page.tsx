"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";




export default function LoginPage(){
        // for routing it to any other page after the login is completed 
        const router = useRouter();

        // taking user data 

        const [user,setUser] = React.useState({
                email:"",
                password:"",
                username:"",
        })
        const [buttonDisabled,setButtonDisabled] = React.useState(false);
        const [loading,setLoading] = React.useState(false);

        useEffect(()=>{
                        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
                                setButtonDisabled(false);
                        }else{
                                setButtonDisabled(true);
                        }
        },[user])


        const onLogin = async () =>{

                try {
                      setLoading(true);
                      const response = await axios.post("/api/users/login",user);
                      console.log("Login Success",response.data)
                      toast.success("Login success");
                      router.push("/profile");
                } catch (error:any) {
                        console.log("Login failed",error.message)
                        toast.error(error.message);
                }
                finally{
                        setLoading(false)
                }
                // to take the data and then perfom signup 
        }
        return(
                <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
                        <h1>{loading?"Processing":"Login"}</h1>
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
                         onClick={onLogin}
                         className="p-1 mb-2 border border-gray-300 focus:outline-none rounded-lg cursor-pointer bg-green-400 text-black hover:bg-green-600 transition delay-50 duration-300 ease-in-out hover:scale-110 px-2"
                         >Login</button>
                         <Link href="/signup">new user? Signup here
                         </Link>
                </div>
        )
    }