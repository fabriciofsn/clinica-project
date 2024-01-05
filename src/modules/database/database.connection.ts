import mongoose from 'mongoose';
require('dotenv').config();

export async function databaseConnection() {
  try{
    await mongoose.connect(`mongodb+srv://${process.env.DB_PASSWORD}.mongodb.net/clinica`)
    .then(() => console.log('Database connected'));
  }catch(e){
    console.log(`There was an error ${e}`);
  }
}