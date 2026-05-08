require("dotenv").config()

const mongoose = require("mongoose");

const connectMongodb = async () => {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
        console.error("Missing MONGODB_URL in environment. Create backend/.env from backend/.env.example.");
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(mongoUrl);
        console.log(`Mongo Db successfully Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);    // Kill the server if db is not connecting; there is no point in moving forward without the db
    }
}

module.exports = connectMongodb;