const express = require('express')

const port = 8000
const cors = require('cors');
const candidateRoute= require('./routes/candidate.js');
const database= require('./db/database.js')
const bodyParser= require('body-parser');
const convertDate  = require('./middleware/dateFormat.js');

const app = express()

app.use(cors());
app.use(bodyParser.json());
database();


app.use('/',candidateRoute)

app.listen(port, () => {
  console.log('Server is up on port : ',port)
});