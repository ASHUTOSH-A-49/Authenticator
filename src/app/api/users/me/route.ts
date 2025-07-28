import {getDataFromToken} from "@/helper/getDataFromToken"

import { NextRequest,NextResponse } from "next/server"
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){
    try {
        const UserID = await getDataFromToken(request);
        const user = await User.findById({_id:UserID}).select("-password")

        return NextResponse.json({
            message:"User found",
            data:user
        })

        
        //gives you data from the user from mongo db 
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}