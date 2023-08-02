const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `(db.js) connected to MongoDB database & host is : ${mongoose.connection.host}`
        .bgGreen.white
    );
  } catch (error) {
    console.log(`Error in db.js file: ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
