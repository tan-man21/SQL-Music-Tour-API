// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize');

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
  

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// DATABASE
const sequelize = new Sequelize(process.env.DB_CONNECTION)
const sequelizeTest = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

// CONTROLLERS
const bandsContoller = require('./controllers/bands_controller')
app.use('/bands', bandsContoller)

// LISTEN
app.listen(process.env.PORT, async () => {
    await sequelizeTest();
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})