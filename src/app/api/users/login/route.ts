import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

import { NextRequest,NextResponse } from "next/server";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


// await connect();//connecting to the database
// console.log("Database connected ")


export async function POST(request:NextRequest){
    await connect();//connecting to the database
    console.log("Database connected ")
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        console.log(reqBody);
        //check if user exists or not

        const user = await User.findOne({email}) //NOTE:as it is a database call, it must be awaited 
        // NOTE:All DATABASE CALLS MUST BE AWAITED 

        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }

        

        //check if password is correct

        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid password"},{status:400})
        }


        //create TOKEN_DATA
        const tokenData = {
            id:user._id, //id is stored as _id in the database
            username:user.username,
            email:user.email,
            
        }
        //creeate TOKEN
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        //accept this created token to the user cookies 

        const response = NextResponse.json({
            message:"Login successful",
            success:true,
        })

        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
