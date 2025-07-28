import mongoose from 'mongoose';
import 'dotenv/config';

(async () => {
  try {
    console.log("Connecting...");
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected successfully");
  } catch (error) {
    console.error("❌ Connection failed:", error);
  } finally {
    mongoose.disconnect();
  }
})();
