// Require dependencies.
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const path = require('path')
const port = process.env.PORT || 3019;

// Require methods from app.js.
const { readSurveys, isUserRegistered, addSurvey, addUser, editSurvey, deleteSurvey } = require('./db')


// Define the path where the public files are, as built by React.
server.use(express.static(path.join(__dirname, "client/public")))


// Set up bodyParser to allow HTTP POST requests in Express
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

// server.get("/total", async (req, res) =>{
//     const total = await runTotal();

//     res.send({
//         total: total[0].num
//     });
// });


// GET   /readsurveys
server.get("/readsurveys", async (req,res) => {
    console.log(req.body)
    const data = await readSurveys(req.query.user_id)
    console.log(data)
    res.send(data)

})


// POST   /register
server.post("/signup", async (req,res) => {
    const data = await addUser(req.body.addUser)   // addUser = {username:'fffffffff', email:'xxxxx@qqqq.com'}
    console.log(data) // 1 if row added
    res.send({"message": data})
})


// GET   /signin
server.get("/signin", async (req,res) => {
    console.log("req.query:")
    console.table(req.query)
    const data = await isUserRegistered(req.query.username)
    console.log(data)  
    res.send({"id": data})  // returns id of user or false
})


// POST   /addsurvey
server.post("/addsurvey", async (req,res) => {

    const data = addSurvey(req.body.addSurvey)
    console.log(data)

    res.send({message: 'Added survey ok'})
})



// DELETE  /deletesurvey
server.delete("/deletesurvey", async (req,res) => {

    const data = deleteSurvey(req.body.deleteSurvey)
    console.log(data)
    res.send({message: 'Deleted survey ok'})

})



// PUT  /editsurvey
server.put("/editsurvey", async (req,res) => {

    const data = editSurvey(req.body.editSurvey)
    console.log(data)
    res.send({message: 'Edited survey ok'})

})








// setup basic URL where server exists
server.listen(port, () => {
    console.log('listening to port '+port)
})