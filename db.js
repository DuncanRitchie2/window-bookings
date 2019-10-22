const mysql = require('mysql')
const { promisify } = require('util')

if (process.env.ENVIRONMENT != "PRODUCTION") {
	const dotenv = require('dotenv');
	dotenv.config()
}

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



// Methods for addUser, readSurveys, isUserRegistered, addSurvey, editBooking, deleteSurvey (and more!)


// Get the count of surveyors. Useful in assigning a surveyor to a new survey.
const countSurveyors = async () => {
    try {
        let total = await promisifiedQuery('SELECT count(*) as num FROM surveyors');
        console.table(total)
        console.log(total[0])
        console.log("total.num = "+total.num)
        return(total[0].num)
    } catch (error) {
        console.log(error.sqlMessage);
    }
    // connection.end()
}


// Retrieve all the customer's surveys.
const readCustomersSurveys = async (customer_id) => {
    try {
        // This is used after adding, editing or deleting a survey
        // Should read all surveys of the user from sql and 
        // send the entire list to client

        //MySql query
        const queryString = `SELECT surveys.id, surveyor_id, surveyors.firstName, surveyors.lastName, premises_id, houseNumber, street, town, country, postCode, latitude, longitude, dateToHappen FROM surveys JOIN premises ON premises.id=surveys.premises_id JOIN surveyors ON surveyors.id = surveys.surveyor_id WHERE customer_id=${customer_id} ORDER BY dateToHappen DESC;`
        let data = await promisifiedQuery(queryString)

        console.log('readCustomersSurvey SQL query')
        console.log(data)
        return(data) // returns an array of objects.

    } catch (error) {
        console.log('readCustomersSurvey error')
        console.log(error.sqlMessage)
        return("error");
    }

    // connection.end()
}


// Retrieve all the surveyor's surveys.
const readSurveyorsSurveys = async (surveyor_id) => {
    try {
        // This is used after adding, editing or deleting a survey
        // Should read all surveys of the user from sql and 
        // send the entire list to client

        //MySql query
        const queryString = `SELECT surveys.id, customer_id, customers.firstName, customers.lastName, premises_id, houseNumber, street, town, country, postCode, latitude, longitude, dateToHappen, status FROM surveys JOIN premises ON premises.id=surveys.premises_id JOIN customers ON customers.id = surveys.customer_id WHERE surveyor_id=${surveyor_id} ORDER BY dateToHappen DESC;`
        let data = await promisifiedQuery(queryString)

        console.log('readSurveyorsSurveys Sql query')
        console.log(data)
        return(data) // returns an array of objects.

    } catch (error) {
        console.log('readSurveyorsSurveys error')
        console.log(error.sqlMessage)
        return("error")
    }

    // connection.end()
}


// Return an ID for a surveyor name.

const getSurveyorId = async (firstNameGiven, lastNameGiven) => {
    console.log("Testing whether "+firstNameGiven+" "+lastNameGiven+" is registered as a surveyor")
    
    try {
        //MySql Query
        const queryString = `SELECT id FROM surveyors WHERE firstName='${firstNameGiven}' && lastName='${lastNameGiven}';`
        
        let data = await promisifiedQuery(queryString)

        if(data[0] !== undefined){
            console.log(`Surveyor ${firstNameGiven} ${lastNameGiven} exists in database`)
            console.log("The surveyor_id is "+data[0].id)
            return data[0].id
        }
        else{
            console.log(`Surveyor ${firstNameGiven} ${lastNameGiven} doesn't exist in database`)
            console.log("The surveyor_id is null")
            return null
        }

    } catch (error) {
        console.log('is Surveyor Registered error')
        console.log('The error message is '+error.sqlMessage)
    }

    // connection.end()
}

// Returns a customer_id if the customer already exists.

const getCustomerId = async (firstNameGiven, lastNameGiven) => {
    console.log("Testing whether "+firstNameGiven+" "+lastNameGiven+" is registered")
    
    try {
        //MySql Query
        const queryString = `SELECT id FROM customers WHERE firstName='${firstNameGiven}' && lastName='${lastNameGiven}';`
        
        let data = await promisifiedQuery(queryString)

        if(data[0] !== undefined){
            console.log(`Customer ${firstNameGiven} ${lastNameGiven} exists in database`)
            console.log("The customer_id is "+data[0].id)
            return data[0].id
        }
        else{
            console.log(`Customer ${firstNameGiven} ${lastNameGiven} doesn't exist in database`)
            console.log("The customer_id is null")
            return null
        }

    } catch (error) {
        console.log('is Customer Registered error')
        console.log('The error message is '+error.sqlMessage)
    }

    // connection.end()
}


const splitAddress = (address) => {
    // Parse address into houseName, houseNumber, and street.
    const firstWord = address.split(" ")[0]
    const street = address.replace(firstWord+" ","")
    let houseNumber = parseInt(firstWord, 10)
    let houseName = null
    if (!houseNumber) {
        houseNumber = null;
        houseName = firstWord;
    }
    return {
        houseName, houseNumber, street
    }
}

const getPremisesId = async (address, town, country) => {
    console.log("Testing whether "+address+", "+town+", "+country+" is registered")

    // Parse address into houseName, houseNumber, and street.
    const addressObject = splitAddress(address)
    const { houseName, houseNumber, street } = addressObject

    try {
        //MySql Query
        const queryString = `SELECT id FROM premises WHERE houseName='${houseName}' && houseNumber='${houseNumber}' && street='${street}' && town='${town}' && country='${country}';`
        
        let data = await promisifiedQuery(queryString)

        if (data[0] !== undefined){
            console.log("Premises "+address+", "+town+", "+country+" exists in database")
            console.log("The premises_id is "+data[0].id)
            return data[0].id
        }
        else {
            console.log("Premises "+address+", "+town+", "+country+" does not exist in database")
            console.log("The premises_id is null")
            return null
        }

    } catch (error) {
        console.log('is Customer Registered error')
        console.log('The error message is '+error.sqlMessage)
    }

}

// Add a survey
const addSurvey = async (survey) => {
    let customer_id = await getCustomerId(survey.firstName, survey.lastName)
    let premises_id = await getPremisesId(survey.propertyAddress, survey.propertyTown, survey.propertyCountry)

    if (!customer_id) {
        // If there is no matching customer existing, we add a customer, and retrieve the new customer_id.
        const newCustomerResponse = await addCustomer(survey.firstName, survey.lastName)
        if (newCustomerResponse === "Added new customer ok") {
            customer_id = await getCustomerId(survey.firstName, survey.lastName)
        }
    }

    if (!premises_id) {
        // If there is no matching premises existing, we add a premises, and retrieve the new premises_id.
        const newPremisesResponse = await addPremises(survey.propertyAddress, survey.propertyTown, survey.propertyCountry)
        if (newPremisesResponse === "Added new premises ok") {
            premises_id = await getPremisesId(survey.propertyAddress, survey.propertyTown, survey.propertyCountry)
        }
    }

    if (customer_id && premises_id) {
        try {
            // Date and time are separate on front-end, so need to be merged.
            let { surveyDate, surveyTime } = survey
            const dateToHappen = surveyDate+" "+surveyTime+":00";

            // Assign the survey to a random surveyor.
            const numSurveyors = await countSurveyors()
            console.log("There are "+numSurveyors+" surveyors")
            console.table(numSurveyors)
            const surveyor_id = Math.ceil(Math.random()*numSurveyors);
            console.log("The chosen surveyor is "+surveyor_id)
            
            // MySql query
            const queryString = `INSERT INTO surveys(customer_id, premises_id, dateToHappen, surveyor_id, status) VALUES ('${customer_id}','${premises_id}','${dateToHappen}', '${surveyor_id}', 'pending');`
            let data = await promisifiedQuery(queryString)

            console.log('addSurvey SQL query')
            console.log(data)
            
            console.log('Attempting to send customer_id ('+customer_id+') from db.addSurvey()')
            return(customer_id);

        } catch (error) {
            console.log('addSurvey error')
            console.log(error.sqlMessage)
        }
    }
    
    else {
        console.log('Error adding a new customer or premises.')
    }

    // connection.end()
}


// Add a customer.
const addCustomer = async (firstName, lastName) => {
    try {
         //MySql Query
        const queryString = `INSERT INTO customers (firstName, lastName) VALUES ('${firstName}', '${lastName}');`
        let data = await promisifiedQuery(queryString)
        
        console.log('Add customer via SQL query')
        console.log(data)
        return(data.message || "Added new customer ok")

    } catch (error) {
        console.log('Add customer error')
        return(error.code)
    }

    // connection.end()
}

// Add a premises.
const addPremises = async (address, town, country) => {
    // Parse address into houseName, houseNumber, and street.
    const addressObject = splitAddress(address)
    const { houseName, houseNumber, street } = addressObject

    try {
        //MySql Query
        console.log("Attempting to add "+houseName+" "+houseNumber+" "+street+", "+town+", "+country+" into database.")
        const queryString = `INSERT INTO premises (houseName, houseNumber, street, town, country) VALUES ('${houseName}', '${houseNumber}', '${street}', '${town}', '${country}');`
        let data = await promisifiedQuery(queryString)
        
        console.log('Add premises via SQL query')
        console.log(data)
        return(data.message || "Added new premises ok")

    } catch (error) {
        console.log('Add premises error')
        return(error.code)
    }

    // connection.end()
}


// Edit a booking as a customer.
const editBooking = async (submission, survey_id, customer_id) => {
    console.log("Hello from db.editBooking()!")

    try {
        let { propertyAddress, propertyTown, propertyCountry, surveyDate, surveyTime } = submission
        
        let premises_id = await getPremisesId(propertyAddress, propertyTown, propertyCountry)
        console.log("premises_id: "+premises_id)
        if (!premises_id) {
            addPremises(propertyAddress, propertyTown, propertyCountry)
            premises_id = await getPremisesId(propertyAddress, propertyTown, propertyCountry)
            console.log("premises_id: "+premises_id)
        }

        console.log("customer_id: "+customer_id)
        console.log("survey_id: "+survey_id)
        if (customer_id && survey_id && premises_id) {
            const dateToHappen = surveyDate+" "+surveyTime+":00";

            // MySql query
            const query = `UPDATE surveys SET premises_id='${premises_id}' AND dateToHappen='${dateToHappen}' WHERE id=${survey_id} AND customer_id=${customer_id};`
            let data = await promisifiedQuery(query)
            
            console.log(data)

            console.log('Edit booking via SQL queries')
        }
        else {
            console.log("Error: customer_id, survey_id, and premises_id are not all defined")
        }
        
        // return(data)

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
        
        const queryString = `DELETE FROM surveys WHERE id=${survey_id} AND user_id=${user_id};`
        let data = await promisifiedQuery(queryString)
        
        console.log('delete survey via SQL query')
        console.log(data)

    } catch (error) {
        console.log('delete survey error')
        console.log(error.sqlMessage)
    }

    // connection.end()
}

// Read a booking to be edited as a customer.
const readBooking = async (survey_id, customer_id) => {
    try {
        const premisesQuery = `SELECT * FROM surveys JOIN premises ON premises.id = surveys.premises_id WHERE surveys.id = ${survey_id} AND customer_id = ${customer_id}`
        let premisesData = await promisifiedQuery(premisesQuery)

        console.table(premisesData)

        return {
            "premises": premisesData[0]
        }
    }
    catch (error) {
        console.log('read premises error')
        console.log(error.sqlMessage)
    }
}


// Read a premises to be edited as a surveyor.
const readPremises = async (survey_id) => {
    try {
        const premisesQuery = `SELECT * FROM premises JOIN surveys ON premises.id = surveys.premises_id WHERE surveys.id = ${survey_id}`
        let premisesData = await promisifiedQuery(premisesQuery)

        const windowsCountQuery = `SELECT COUNT(*) AS "count" FROM windows WHERE premises_id = (SELECT premises_id FROM surveys WHERE id = ${survey_id})`
        let windowsCountData = await promisifiedQuery(windowsCountQuery)
        let windowsCount = await windowsCountData[0].count

        console.table(windowsCountData)

        console.log("The premises has "+windowsCount+" windows.")

        return {
            "premises": premisesData[0],
            "windowsCount": windowsCount
        }
    }
    catch (error) {
        console.log('read premises error')
        console.log(error.sqlMessage)
    }
}


// Submit/edit a survey as a surveyor.
const submitSurvey = async (submission, survey_id, surveyor_id) => {
    try {
        // FINISH WRITING CODE THAT INSERTS DATA INTO THE DATABASE IN THE CORRECT TABLES.

        // THE PARAMETER OBJECT submission LOOKS LIKE THIS:
        //     submission: {
        //         style: "Georgian",
        //         windowsCount: 2,
        //         windows: [
        //             {
        //                 description: "Front window",
        //                 height: 1.2,
        //                 width: 0.6,
        //                 url: "htttps://www.duncanritchie.co.uk/windows/photo-of-front-window.jpg"
        //             },
        //             {
        //                 description: "Side window",
        //                 height: 1.8,
        //                 width: 1.2,
        //                 url: "htttps://www.duncanritchie.co.uk/windows/photo-of-side-window.jpg"
        //             }
        //         ]
        //     }
        // THE PARAMETER survey_id IS AN INTEGER.
        
        console.log("db.submitSurvey() has received a submission of...")
        console.table(submission)
        console.log("... for a survey_id of "+survey_id)
        console.log("... and a surveyor_id of "+surveyor_id)

        const statusQuery = `UPDATE surveys SET status = "complete" WHERE id=${survey_id} && surveyor_id=${surveyor_id};`
        let statusData = await promisifiedQuery(statusQuery)

        const styleQuery = `update premises set style = "${submission.style}" where id = (select premises_id from surveys where surveys.id = ${survey_id});`
        let styleData = await promisifiedQuery(styleQuery)

        console.log(statusData)
        console.log(styleData)

        return "Survey details were received on the backend, but the relevant MySql commands have not been written."
    }
    catch (error) {
        console.log('submit survey error')
        console.log(error.sqlMessage)
    }
}


module.exports = {
    readCustomersSurveys,
    readSurveyorsSurveys,
    getCustomerId,
    getSurveyorId,
    addSurvey,
    addCustomer,
    editBooking,
    deleteSurvey,
    readBooking,
    readPremises,
    submitSurvey
}




