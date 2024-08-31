
const dotenv = require('dotenv')
const dotenvResult = dotenv.config({ path: './.env' }); 
if (dotenvResult.error) {
    console.error('Error loading .env file:', dotenvResult.error);
    process.exit(1); // Exit the process with code 1 if .env file couldn't be loaded
}
const { Sequelize } = require('sequelize');
// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.HOST,
  port: process.env.DB_PORT,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  // Additional options if needed
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Export the Sequelize instance
module.exports = { sequelize, testConnection };




