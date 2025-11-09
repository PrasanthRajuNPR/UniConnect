const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect=()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("Connection Established with db Successfull")
    })
    .catch((err)=>{
        console.log("Error in connection with db "+err)
    })
};

module.exports = dbConnect;