import { error } from 'console'
import mongoose from 'mongoose'



export async function connect() {
    try{
        mongoose.connect(process.env.mongo_url!)
        const connection = mongoose .connection

        connection.on('connected',()=>{
            console.log("Mongo DB connected successfully !!!")
        })

        connection.on('error',(err)=>{
            console.log("An error occured while connecting to MONGO DB!"+err)
            process.exit()
        })
    }catch(error){
        console.log("Something went wrong!!")
        console.log(error)
    }
}