// Require dependencies.
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const path = require('path')

// Require methods from app.js.
const { readReminder, isUserRegistered, addReminder, addUser, editReminder, deleteReminder,runTotal } = require('./app')


// Define the path where the public files are, as built by React.
server.use(express.static(path.join(__dirname, "client/public")))


// To allow HTTP POST requests in Expresss set up bodyParser
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.get("/total", async (req, res) =>{
    const total = await runTotal();

    res.send({
        total:total[0].num
    });
});





// Setup RESTful api  GET, POST PUT and DELETE for
// each type of fetch api is given its own endpoint
// it then takes in the request, selects whats needed
// from the request data and via a method
// (held in app.js module), gives the responce back


// GET   /readreminder
server.get("/readreminder", async (req,res) => {
    console.log(req.body)
    const data = await readReminder(req.query.user_id)
    console.log(data)
    res.send(data)  // returns an array of [{reminder: 'aaaaa'},{reminder:'bbbbbb'},{reminder:'ccccccc'}]

})


// POST   /register
server.post("/register", async (req,res) => {
    const data = await addUser(req.body.addUser)   // addUser = {username:'fffffffff', email:'xxxxx@qqqq.com'}
    console.log(data) // 1 if row added
    res.send({message: data})
})


// GET   /signin
server.get("/signin", async (req,res) => {
    console.log("req.query:")
    console.table(req.query)
    const data = await isUserRegistered(req.query.username)
    console.log(data)  
    res.send({"id": data})  // returns id of user or false
})


// POST   /addreminders
server.post("/addreminders", async (req,res) => {

    const data = addReminder(req.body.addReminder)
    console.log(data)

    // We may want to send a part of the data, not all.
    res.send({message: 'Added reminders ok'})
})



// DELETE  /deletereminders
server.delete("/deletereminders", async (req,res) => {

    const data = deleteReminder(req.body.deleteReminder)
    console.log(data)
    res.send({message: 'Deleted reminders ok'})

})



// PUT  /editreminders
server.put("/editreminders", async (req,res) => {

    const data = editReminder(req.body.editReminder)
    console.log(data)
    res.send({message: 'Edited reminder ok'})

})








// setup basic URL where server exists
server.listen(3019, () => {
    console.log('listening to localhost:3019')
})