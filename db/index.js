const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require("dotenv").config();


mongoose.connect(process.env.MONGO_URL)
  .then(response => console.log(`Connected to the database ${response.connection.name}`))
  .catch(err => console.error(err))