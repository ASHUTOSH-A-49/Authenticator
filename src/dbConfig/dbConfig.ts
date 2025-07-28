import mongoose from 'mongoose';



//using mongoose for atlas


// export async function connect() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI!);
//     const connection = mongoose.connection;

//     connection.on('connected', () => {
//       console.log('MongoDB connected successfully');
//     });

//     connection.on('error', (err) => {
//       console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
//       process.exit();
//     });
//   } catch (error) {
//     console.log('Something went wrong while connecting to the database');
//     console.log(error);
//   }
// }


//locally connecting MONGODB


const MONGODB_URI = process.env.LOCAL_MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("❌ LOCAL_MONGO_URI is not defined in environment variables");
}

let isConnected = false;

export const connect = async (): Promise<void> => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "test", // use "test" as shown in your MongoDB GUI
    });
    isConnected = true;
    console.log("✅ MongoDB connected via Mongoose");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};



