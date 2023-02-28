const mongoose = require("mongoose");

const db = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error ${error.message}`);
    process.exit(1);
  }
};

module.exports = db;

// const dotenv = require("dotenv");
// const { Client, Pool } = require("pg");

// dotenv.config();

// const db = new Pool({
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   database: process.env.PGDATABASE,
//   port: Number(process.env.PGPORT) || 5432,
//   host: process.env.PGHOST,
// });

// db.connect().then(() => {
//   console.log(`Connected to database.`);
// });

// module.exports = db;
