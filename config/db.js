const mongoose = require("mongoose");

// const mongoURI = 'mongodb://localhost/pokemon-collector';
const mongoURI = "mongodb://localhost:27017/pokemon-collector";

const db = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = db;