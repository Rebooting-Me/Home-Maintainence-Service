const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

//for parsing data in JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//listening to port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

//