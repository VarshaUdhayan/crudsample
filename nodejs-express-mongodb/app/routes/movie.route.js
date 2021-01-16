const express = require("express");

const router = express.Router();
const Movie= require('../models/movies.model');



router.get('/',async(req,res,next)=>
{
   try{
       const result= await Movie.find({},{id :1, movietitle: 1, movierating: 1, moviereview: 1,movierelease:1})
       if(result){
           //console.log(result);
           //res.send(result);
            return res.status(200).json(result);
       }
       res.status(404).json({ message: "not found"})
   }
   catch(error)
   {
    res.send(error.message); 
   }
    
});

 //router.post('/', async (req, res) => {
    //const { movietitle,movierating, moviereview, movierelease  } = req.body;
    //console.log(startTime);
   //const mov= new Movie({
      // movietitle, movierating, moviereview, movierelease
   //});
   //try {
       //let movieRecord = await mov.save();
       // console.log(movieRecord);
       //return res.status(200).send(movieRecord);
   //} catch(err) {
      // console.log(err);
       //return res.status(501).json({message: "error adding movie, please try again"});    }
//});

router.post('/', (req, res) => {
   var mov = new Movie({
        movietitle: req.body.movietitle,
        movierating: req.body.movierating,
        moviereview: req.body.moviereview,
        movierelease: req.body.movierelease,
    });
    mov.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Saving:' + JSON.stringify(err, undefined, 2)); }
    });
    console.log('Error');
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var mov = {
        movietitle: req.body.movietitle,
        movierating: req.body.movierating,
        moviereview: req.body.moviereview,
        movierelease: req.body.movierelease,
    };
    Movie.findByIdAndUpdate(req.params.id, { $set: mov }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in  Update :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Movie.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Deletion :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports= router;

