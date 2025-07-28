// LOGIC FOR LOGOUT - clear out the token


import { NextResponse } from "next/server";


export async function GET(){
    try {
        const response = NextResponse.json({
            message:"Logout successful",
            sucess:true,

        })
        //now we will be setting the token to empty which is as i have mentioned as LOGIC for logout at the top
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)      
        });

        return response; //don't forget it
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}