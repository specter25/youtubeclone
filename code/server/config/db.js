const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

mongoose.Promise = global.Promise;
//inorder to use async await
const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('Mongodb connected');
  } catch (e) {
    console.log(e.message);
    //now just exit the process and fail the application
    process.exit(1);
  }
};
module.exports = connectDB;
