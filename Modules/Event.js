const mongoose = require("mongoose");

const Mymodel = new mongoose.Schema({
    title: String,
    description: String,
    location: String
}, { timestamps: true })

const eventSchema=mongoose.model("eventSchema", Mymodel)

module.exports=eventSchema