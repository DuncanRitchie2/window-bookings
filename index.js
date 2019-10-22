// Require dependencies.
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3019;

// Require methods from app.js.
const { readCustomersSurveys, readSurveyorsSurveys, getCustomerId, getSurveyorId, addSurvey, addCustomer, readBooking, editSurvey, deleteSurvey, readPremises, submitSurvey } = require('./db')

// Define the path where the public files are, as built by React.
server.use(express.static(path.join(__dirname, "client/build")))

// Set up bodyParser to allow HTTP POST requests in Express
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

// Allow cross-origin requests.
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//   app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

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
    console.log(data)
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
    const data = await addCustomer(req.body.addCustomer)
    console.log(data) // 1 if row added
    res.send({"message": data})
})


// GET   /signincustomer
server.get("/signincustomer", async (req,res) => {
    console.log("req.query:")
    console.table(req.query)
    const data = await getCustomerId(req.query.first, req.query.last)
    console.log("index.js has received a customer_id of "+data)  
    res.send({"id": data})  // returns id of customer or null
})


// GET   /signinsurveyor
server.get("/signinsurveyor", async (req,res) => {
    console.log("req.query:")
    console.table(req.query)
    const data = await getSurveyorId(req.query.first, req.query.last)
    console.log("index.js has received a surveyor_id of "+data)  
    res.send({"id": data})  // returns id of surveyor or null
})


// POST   /addsurvey
server.post("/addsurvey", async (req,res) => {

    const data = await addSurvey(req.body.newSurvey)
    console.log("The server has received a customer_id of "+data)

    // data is simply the customer_id.
    res.send({message: 'Added survey ok', customer_id: data})
})



// DELETE  /deletesurvey
server.delete("/deletesurvey", async (req,res) => {

    const data = deleteSurvey(req.body.deleteSurvey)
    console.log(data)
    res.send({message: 'Deleted survey ok'})

})



// PUT  /editsurvey  (customer)
server.put("/editsurvey", async (req, res) => {

    const data = editSurvey(req.body.editSurvey)
    console.log(data)
    res.send({message: 'Edited survey ok'})

})


// GET   /readbooking   (customer)
server.get("/readbooking", async (req, res) => {
    console.log("A booking is to be read!")
    const { survey_id, customer_id } = req.query
    console.log(survey_id)
    const data = await readBooking(survey_id, customer_id)
    console.log("The booking data to send to client are...")
    console.table(data)  
    res.send({data})
})


// GET   /readpremises   (surveyor)
server.get("/readpremises", async (req, res) => {
    console.log("A premises is to be read!")
    const survey_id = req.query.survey_id;
    console.log(survey_id)
    const data = await readPremises(survey_id)
    console.log("The premises data to send to client are...")
    console.table(data)  
    res.send({data})
})


// POST  /submitsurvey  (surveyor)
server.post("/submitsurvey", async (req, res) => {

    submitSurvey(req.body.submission, req.body.survey_id, req.body.surveyor_id)
    res.send({message: 'Submitted survey'})
})







// setup basic URL where server exists
server.listen(port, () => {
    console.log('listening to port '+port)
})