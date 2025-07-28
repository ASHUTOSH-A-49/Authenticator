const mongoose = require('mongoose');
require('dotenv').config(); // ✅ Load environment variables

(async () => {
  try {
    console.log("Connecting...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected successfully");
  } catch (error) {
    console.error("❌ Connection failed:", error);
  } finally {
    await mongoose.disconnect();
  }
})();
