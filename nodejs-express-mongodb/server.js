const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const movieroute = require('./app/routes/movie.route');



const corsOptions = {
    origin: "*",
    methods: ["GET","POST"],
    optionsSuccessStatus: 200
  };


  mongoose.connect('mongodb://localhost:27017/crud',{
  useNewUrlParser:true,
  useUnifiedTopology:true
}) 
.then(() => {
  console.log("Connected to the database!");
})
.catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});

  


  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(bodyParser.json());
 


 app.use(bodyParser.urlencoded({ extended: true }));


  app.use('/movie',movieroute);
 

  const PORT=process.env.PORT || 8080;

app.listen(PORT, function()  {
    console.log(`Server is running on port ${PORT}.`);
  });
  