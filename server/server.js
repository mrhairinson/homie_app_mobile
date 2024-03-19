require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./src/routes');

const app = express();

const port = process.env.PORT || 8000;
const baseUrl = process.env.BASE_URL;
const mongodbUri = process.env.MONGODB_URI;

//Enabled CORS policies
app.use(cors());
//Enable express JSON middleware
app.use(express.json());
//Use routes
app.use(baseUrl, routes);

app.get(baseUrl, (req, res) => {
  res.send('Hello World!');
});

//DB connection
mongoose.connect(mongodbUri)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => console.log(`Error: MongoDB connection Failed: \n${err}`))
  .finally(() => {
    app.listen(port, (err) => {
      if (err) console.log(`Error: ${err}`);
      console.log(`Server listening on http://localhost:${port}/api/v1`);
    });
  })
