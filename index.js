const express = require("express")
const app = express()
const port=5001

app.get("/", (req, resp) => {
    resp.send("its working")
})
app.listen(port, () => {
    console.log(`server is listening to ${port}`)
})