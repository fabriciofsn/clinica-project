import mongoose from 'mongoose';
require('dotenv').config();

export async function databaseConnection() {
  try{
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_CLUSTER}.mongodb.net/clinica`)
    .then(() => console.log('Database connected'));
  }catch(e){
    console.log(`There was an error ${e}`);
  }
}