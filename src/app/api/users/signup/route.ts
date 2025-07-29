import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

import { NextRequest,NextResponse } from "next/server";

import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helper/mailer"


await connect();//connecting to the database
console.log("Database connected ")


//Handle the POST REQUEST

export async function POST(request:NextRequest){
    
    try {
        // handle the data 
        const reqBody = await request.json()
        const {username,email,password} = reqBody  //extract these values from reqBody
        console.log(reqBody);
        // sample of console: 
        // { email: 'abcde@gmail.com', password: 'abcde12345', username: 'abcde' }
        //check if user already exists
        
        const user = await User.findOne({ email });
        


        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
        }


        //Hashing password 
       
const salt = await bcryptjs.genSalt(10);
const hashedPassword = await bcryptjs.hash(password, salt);



        //create an user 
        const newUser = new User({
            username,
            email,
            password:hashedPassword,
        })

        //save it into the database

       
// try {
  const savedUser = await newUser.save();
  console.log("User saved:", savedUser);
  
// } catch (saveErr) {
//   console.error("Error saving user:", saveErr);
//   return NextResponse.json({ error: "Error saving user" }, { status: 500 });
// }





        // sample of console
//         {
//   username: 'abcde',
//   email: 'abcde@gmail.com',
//   password: '$2b$10$I.raXdA15m2AdZrwppej5OiKkiM2IqZs5.MnZBd9Occlwwfo8sm.G',   
//   isVerified: false,
//   isAdmin: false,
//   _id: new ObjectId('688205335ada7c93c09259b1'),
//   __v: 0
// }

// and now the above user you will find in your database (MONGODB)





//send verification email 

await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

        //return a response

     return NextResponse.json({
            message:"User created successfully!",
            success:true,
            savedUser
        })   


    } catch (error: any) {
  console.error("Signup API Error:", error); // <-- LOG EVERYTHING
  return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
}

}


