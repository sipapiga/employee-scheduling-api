require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DBHOST}:${process.env.DBPASSWORD}@patpra.2jv8s.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('Connect to DB');
  } catch (error) {
    console.error(`Database connecting error : ${error}`);
  }
};
module.exports = { connectDB };
