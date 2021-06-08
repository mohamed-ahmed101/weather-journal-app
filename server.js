// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const express = require('express');
const PORT = process.env.PORT || 3000
// Start up an instance of app
const app = express();
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cors for cross origin allowance
app.use(require('cors')())
// Initialize the main project folder
app.use(express.static('website'));

app.get('/getAll', (req, res) => {
    res.json(projectData);
})

app.post('/addData', (req, res) => {
    let { temperature, date, user_response } = req.body;
    if (!(temperature && date && user_response)) return res.status(400).send("enter valid body");
    projectData = { temperature, date, user_response };
    return res.json({ status: "true", description: "new data added" });
})
// Setup Server
app.listen(PORT, () => {
    console.log(`server up and running on port ${PORT}`)
})