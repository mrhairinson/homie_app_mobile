require('dotenv').config()
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/index');

const app = express();

port = process.env.PORT || 8000;
baseUrl = process.env.BASE_URL

//Enabled CORS policies
app.use(cors());

//Enable express JSON middleware
app.use(express.json());

app.use(baseUrl, routes);

app.get(baseUrl, (req, res) => {
  res.send('Hello World!');
});

app.listen(port, (err) => {
  if (err) console.log(`Error: ${err}`);
  console.log(`Server listening on http://localhost:${port}/api/v1`);
});