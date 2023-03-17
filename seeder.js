// Seeder that can add entries to the database from a local file
// Code by Brad Traversy@traversymedia
const fs = require('fs');
const mongoose = require('mongoose');
// const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Broken = require('./models/Broken');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const broken = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/broken.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
    try {
      await Broken.create(broken, {
        validateBeforeSave: false
      })
      console.log('Data Imported...')
      process.exit()
    } catch (err) {
      console.error(err)
    }
  };

// Delete data
const deleteData = async () => {
    try {
      await Broken.deleteMany()
      console.log('Data Destroyed...')
      process.exit()
    } catch (err) {
      console.error(err)
    }
  };

  if (process.argv[2] === '-i') {
    importData()
  } else if (process.argv[2] === '-d') {
    deleteData()
  };
