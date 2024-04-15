const express = require('express');
const connection = require('../connection');
const router = express.Router();
// const bcrypt = require('bcrypt');

router.post('/get',(req,res,next)=>{
    const difficulty = req.body.difficulty;
    var query = "select * from results where difficulty=?";
    connection.query(query,[difficulty],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    });
});


router.post('/getHigh',(req,res,next)=>{
    const difficulty = req.body.difficulty;
    var query = "select username,difficulty,min(time) as time from results where difficulty=? group by username";
    connection.query(query,[difficulty],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    });
});

router.post('/getOwn',(req,res,next)=>{
    const difficulty = req.body.difficulty;
    const username = req.body.username;
    var query = "select username,difficulty,min(time) as time from results where difficulty=? and username=? group by username";
    connection.query(query,[difficulty,username],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    });
});


router.post('/add', async (req,res)=>{
    const username = req.body.username;
    const time = req.body.time;
    const difficulty = req.body.difficulty;

    var insertQuery = "insert into results(username,time,difficulty) values (?,?,?)";
    connection.query(insertQuery,[username,time,difficulty],(err,results)=>{
        if(!err){
            console.log(results);
            return res.status(200).json({message: "Result added successfully"});
        }
        else {
            console.log(err);
            return res.status(500).json(err);
        }
    });
  });

module.exports = router;