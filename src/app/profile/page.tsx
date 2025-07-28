"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage(){
    const router = useRouter()
    const [id,setId] = useState("nothing")
    const [username,setUsername] = useState("nothing")
    const logout = ()=>{
        try {
            axios.get('api/users/logout')
            // we will use get request to the logout api 
            toast.success('Logout Successful')
            router.push('/login')

        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async ()=>{
        // grabbing the user data and displaying it using the useState 
        const res = await axios.get('/api/users/me')
        console.log(res.data)

        setId(res.data.data._id)
        setUsername(res.data.data.username)
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">

            <h1>profile</h1>
            <hr />
            <p>profile page</p>
            <h2 className="p-1 rounded text-orange-400 bg-black">{id==='nothing'?"Id:":<Link href={`/profile/${id}`}>{`Id: ${id}`}</Link>}</h2>
            <h2 className="my-1 p-1 rounded text-orange-400 bg-black">{username==='nothing'?"Username:":<p>{`Username: ${username}`}</p>}</h2>
        <hr/>
        <button
        className="bg-red-400 m-2 hover:bg-red-600 text-white py-2 px-4 rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-150 ease-in"

        onClick={logout}
        >Logout</button>
        <button
        className="bg-violet-400 m-2 hover:bg-violet-600 text-white py-2 px-4 rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-150 ease-in"

        onClick={getUserDetails}
        >User Info</button>


        </div>
    )
}