const e = require("express");
const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL);
  console.log(` Mongo connected at ${conn.connection.host}`);
};
module.exports = connectDB;
