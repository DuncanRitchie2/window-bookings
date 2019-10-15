// Require dependencies.
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const path = require('path')
const port = process.env.PORT || 3019;

// Require methods from app.js.
const { readCustomersSurveys, readSurveyorsSurveys, isCustomerRegistered, addSurvey, addCustomer, editSurvey, deleteSurvey } = require('./db')


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


// GET   /readcustomerssurveys
server.get("/readcustomerssurveys", async (req,res) => {
    console.log("Hello from /readcustomerssurveys!")
    const data = await readCustomersSurveys(req.query.id) 
    res.send(data)

})


// GET   /readsurveyorssurveys
server.get("/readsurveyorssurveys", async (req,res) => {
    console.log("Hello from /readsurveyorssurveys!")
    console.log(req.body)
    const data = await readSurveyorsSurveys(req.query.id)
    console.log(data)
    res.send(data)

})


// POST   /register
server.post("/signup", async (req,res) => {
    const data = await addCustomer(req.body.addCustomer)   // addCustomer = {username:'fffffffff', email:'xxxxx@qqqq.com'}
    console.log(data) // 1 if row added
    res.send({"message": data})
})


// GET   /signin
server.get("/signin", async (req,res) => {
    console.log("req.query:")
    console.table(req.query)
    // const data = 3
    const data = await isCustomerRegistered(req.query.first, req.query.last)
    console.log("index.js has received a customer_id of "+data)  
    res.send({"id": data})  // returns id of user or null
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