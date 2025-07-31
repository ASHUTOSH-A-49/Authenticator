"use client"

import axios from "axios"

import Link from "next/link"
import Router from "next/router"
import React,{ useEffect,useState } from "react"

export default function VerifyEmailPage(){

    const[token,setToken] = useState("");
    const[verified,setVerified] = useState(false)
    const[error,setError] = useState(false);

    const verifyUserEmail = async()=>{
        try {
            // sending post request from axios 
            await axios.post('/api/users/verifyemail',{token})
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
    }
    // useEffect is a hook that automatically runs as soon as the page is loaded 
    useEffect(()=>{
        const urlToken = decodeURIComponent(window.location.search.split("=")[1] || "");

        setToken(urlToken || "")
        // as soon as token is set, i.e. th token is updated then the below useEffect hook will run automatically 
    },[token])

    useEffect(()=>{
        if(token.length>0) verifyUserEmail();
// any change in the token will run this one 
    },[token])
    // in the dependency array we have kept token that means as soon as there is any change in the token, then the useEffect will run 


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Your Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token?`${token}`:"no token"}</h2>
            {verified && (
                //if verified then display this
                <div>
                    <h2>Email verified</h2>
                    <Link href = '/login'>
                    login
                    </Link>
                </div>
            )}
            {error && (
                //if error then display this
                <div>
                    <h2 className="text-2xl bg-red-600 text-black">Error</h2>
                    
                </div>
            )}
        </div>
    )
}

