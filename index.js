const express = require("express")
const app = express()
const port = 5001
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const eventSchema = require("./Modules/Event");
require("./Modules/Event")

//const uri = "mongodb+srv://darshanrgs45:darshanrgs45@cluster0.phsbb9v.mongodb.net/Event?retryWrites=true&w=majority"
mongoose.connect('mongodb://localhost:27017/eventScheduler', {
    useNewUrlParser: true,
}).then(() => {
    console.log("succesfully connected to  db")
}).catch((err) => {
    console.log("error connecting to db")
})

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//read
app.get("/", (req, resp) => {
    resp.send("its working")
})

//create a single event
app.post("/v1/events", async (req, resp) => {
    const { title, description, location } = req.body
    //console.log(title)
    try {
        const eventData = new eventSchema({
            title: title, description: description, location: location
        })
        console.log(eventData)
        await eventData.save()
        resp.json(eventData)
    } catch (err) {
        console.log(err)
        resp.status(500).send("server error")
    }
})




//get a requested specific event

app.get("/v1/events/:id", async (req, resp) => {
    //console.log("darsh")
    try {
        let data = await eventSchema.findById(req.params.id)
        resp.status(200).json(data);
        console.log(req.params.id)

    } catch (err) {
        resp.json({
            status: "failure",
            message: '"There is no event with that id"'
        })
    }
})

//read all events
app.get("/v1/events", async (req, resp) => {

    try {
        const eventdatas = await eventSchema.find()
        resp.json(eventdatas)
        //console.log(eventdatas)
    } catch (err) {
        console.log(err)
        resp.status(500).send("server error")
    }
})


//delete

app.delete("v1/events/:id", async (req, resp) => {
    try {
        const eventdataa = await eventSchema.deleteOne({_id:req.params.id})
        resp.send(eventdataa)
    } catch (err) {
        resp.status(204).json({
            status: "Failed",
            message: " err.message"
        })
    }
})
//update
app.put("v1/events/:id", async (req, resp) => {
    try {
        if (req.body.title == "") {
            resp.status(204).json({
                status: "Failed",
                message: " validation error title is required"
            })
        }

        const eventdataa = await eventSchema.updateOne({ _id: req.params.id }, req.body);
        const newdata = await eventSchema.findById(req.params.id)
        resp.send(newdata)
    } catch (e) {
        resp.status(400).json("e.message")
    }
})



//event not found for getting specific event
app.listen(port, () => {
    console.log(`server is listening to ${port}`)
})