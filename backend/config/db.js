require("dotenv").config()

const mongoose = require("mongoose");

const connectMongodb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Mongo Db successfully Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(error);
        process.kill(1);    //Kill server if db is not connecting no pooint in moving forward without the db
    }
}

module.exports = connectMongodb;