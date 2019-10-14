const mysql = require('mysql')
const { promisify } = require('util')

if (process.env.ENVIRONMENT != "PRODUCTION") {
	const dotenv = require('dotenv');
	dotenv.config()
}

// ******************** CHECK THIS *******************
// make sure the local mysql setup corresponds to this
// e.g. password should not typically be 'password' for
// the mysql server

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
})

//  connection.query(' query passed here')  
// is the non-promisified form
// but we want to uses promises so we promisify it

const promisifiedQuery = promisify(connection.query).bind(connection)



// Methods for addUser, readSurveys, isUserRegistered, addSurvey, editSurvey, deleteSurvey


// // gets total number of users
// const runTotal = async () => {
//     try{
//         let total = await promisifiedQuery('SELECT count(*) as num FROM users');
//         return(total)
//     } catch (error) {
//         console.log(error.sqlMessage);
//     }
//     connection.end()
// }


// Retrieve all the customer's surveys.
const readCustomersSurveys = async (user_id) => {
    try {

        // This is used after adding, editing or deleting a survey
        // Should read all surveys of the user from sql and 
        // send the entire list to client

        //Mysql Query
        const queryString = `SELECT surveys.id, premises_id, date_due FROM surveys JOIN customers ON customers.id=surveys.user_id WHERE customer_id=${user_id};`
        let data = await promisifiedQuery(queryString)

        console.log('read Survey SQL query')
        console.log(data)
        return(data) // returns an array of objects.


    } catch (error) {
        console.log('readSurvey error')
        console.log(error.sqlMessage)
    }

    // connection.end()
}


// Retrieve all the surveyor's surveys.
const readSurveyorsSurveys = async (surveyor_id) => {
    try {

        // This is used after adding, editing or deleting a survey
        // Should read all surveys of the user from sql and 
        // send the entire list to client

        //Mysql Query
        const queryString = `SELECT surveys.id, premises_id, date_due FROM surveys JOIN surveyors ON surveyors.id=surveys.surveyor_id WHERE surveyor_id=${surveyor_id};`
        let data = await promisifiedQuery(queryString)

        console.log('read Survey SQL query')
        console.log(data)
        return(data) // returns an array of objects.


    } catch (error) {
        console.log('readSurvey error')
        console.log(error.sqlMessage)
    }

    // connection.end()
}


// Check if the customer is actually signed-up

const isCustomerRegistered = async (usernameGiven) => {
    console.log("Testing whether "+usernameGiven+" is registered")
    
    try {
        //MySql Query
        const queryString = `SELECT id FROM customers WHERE customer='${usernameGiven}';`
        
        let data = await promisifiedQuery(queryString)

        console.log(`is ${usernameGiven} Registered SQL query`)
        console.log(data[0])

        if(data[0] !== undefined){
            console.log(`user ${usernameGiven} given exists in database`)
            console.log(data[0].id)
            return data[0].id
        }
        else{
            console.log("user doesn't exist in database, client needs to ask to register")
            console.log(false)
            return false
        }

    } catch (error) {
        console.log('is Customer Registered error')
        console.log('The error message is '+error.sqlMessage)
    }

    // connection.end()
}


// Add a survey
const addSurvey = async (survey) => {
    try {
        // addSurvey = {"customer_id": 3, "reminder": "adding a test reminder ********", "date_added": "2019-10-04"}
        let { customer_id, premises_id, date_booked } = survey
        // MySql Query
        const queryString = `INSERT INTO surveys(customer_id,premises_id,date_booked) VALUES ('${customer_id}','${premises_id}','${date_booked}');`
        let data = await promisifiedQuery(queryString)

        console.log('addSurvey SQL query')
        console.log(data)


    } catch (error) {
        console.log('addSurvey error')
        console.log(error.sqlMessage)
    }

    // connection.end()
}


// Add a customer.
const addCustomer = async (customer) => {
    try {
        let { newUserName, newEmail } = addUser
         //MySql Query
        const queryString = `INSERT INTO customers (username, email) VALUES ('${newUserName}', '${newEmail}');`
        let data = await promisifiedQuery(queryString)

        // Sql should add new user and give back a customer_id
        // server should send this customer_id to client 
        
        console.log('Add customer via SQL query')
        console.log(data)
        return(data.message || "Added new customer ok")


    } catch (error) {
        console.log('Add customer error')
        return(error.code)
    }

    // connection.end()
}


// Edit a survey.
const editSurvey = async (survey) => {

    try {

        let { premises_id, date_due, survey_id, customer_id } = survey

        // Mysql Query
        const queryString = `UPDATE surveys set premises_id='${premises_id}', date_due='${date_due}' where id=${survey_id} && customer_id=${customer_id};`
        let data = await promisifiedQuery(queryString)
        
        console.log(data)

        console.log('Edit survey via SQL query')
        //return(data)

    } catch (error) {
        console.log('Edit survey error')
        console.log(error.sqlMessage)
    }

    // connection.end()
}


// Delete a survey
const deleteSurvey = async (survey) => {
    try {

        let { user_id, survey_id } = survey

        // MySql Query
        
        const queryString = `DELETE FROM surveys WHERE id=${survey_id} && user_id=${user_id};`
        let data = await promisifiedQuery(queryString)
        
        console.log('delete reminder via SQL query')
        console.log(data)

    } catch (error) {
        console.log('delete reminder error')
        console.log(error.sqlMessage)
    }

    // connection.end()
}



module.exports = {
    readCustomersSurveys,
    readSurveyorsSurveys,
    isCustomerRegistered,
    addSurvey,
    addUser,
    editSurvey,
    deleteSurvey
}




