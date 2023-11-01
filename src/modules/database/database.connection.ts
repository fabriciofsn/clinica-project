import mongoose from 'mongoose';
require('dotenv').config();

export async function databaseConnection() {
  await mongoose.connect(`mongodb+srv://fabriciodev:${process.env.DB_PASSWORD}@cluster0.skhxinx.mongodb.net/`)
  .then(() =>{
    console.log('Database connected')
  })
}