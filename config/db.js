const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB successfully!");
    } catch (err) {
        console.log("Error occur during DB connection: ", err);
    }
};

module.exports = connectToDb;