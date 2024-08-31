
const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()
const dbService = require('./DBServices/database')
const userRouter = require('./routes/user')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/users",userRouter)
// create

app.get('/clients', (req, res) => {
  const db = dbService.getDbServiceInstance()
})



app.post('/insert', (req, res) => {
  console.log(req.url)
  const { name } = req.body
  const db = dbService.getDbServiceInstance()
  const result = db.insertNewName(name)
  result
    .then(data => res.json({ success: true }))
  .catch(err=>console.log(err))
})
// read
app.get('/getAll', (req, res) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllData()
  result
    .then(data => res.json({ data: data }))
  .catch(err => console.log(err))
  
})

// update
app.put('/insert', (req, res) => {
  
})

// delete
app.delete('/insert', (req, res) => {
  
})

app.listen(process.env.PORT, ()=> console.log('app is running on port '+process.env.PORT))














// connection test   come back later
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin',
//     database: 'base'
// })
// connection.query('SELECT * FROM users', function (error, results, fields) {
//     if (error) {
//       console.error('Error executing query:', error);
//       return;
//     }
  
//     // Log the results
//     console.log('Query results:', results);
  
//     // You can loop through the results here and process them as needed
//   });

//   connection.end();
