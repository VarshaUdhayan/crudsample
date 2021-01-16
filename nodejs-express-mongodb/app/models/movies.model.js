const mongoose = require("mongoose");
const  Schema = mongoose.Schema;



    const MovieSchema = new Schema({
         id :String,
         movietitle: String,
         movierating :Number,
         moviereview: String,
         movierelease: Date,
      }

    );
   const movie=mongoose.model('movies',MovieSchema);
   module.exports= movie;