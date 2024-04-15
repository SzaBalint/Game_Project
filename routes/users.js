const express = require('express');
const connection = require('../connection');
const router = express.Router();
// const bcrypt = require('bcrypt');

router.post('/register', async (req,res)=>{
  const username = req.body.username;
  const hashedPassword =  req.body.password;

  var checkQuery  = "select * from users where username=?";
  connection.query(checkQuery,[username],(err,results)=>{
      if(!err){
          if(results.length <= 0){
              var insertQuery = "insert into users(username,password) values (?,?)";
              connection.query(insertQuery,[username,hashedPassword],(err,results)=>{
                  if(!err){
                      console.log(results);
                      return res.status(200).json({message: "Registered successfully"});
                  }
                  else {
                      console.log(err);
                      return res.status(500).json(err);
                  }
              });
          }
          else {
              console.log("Username already exists");
              return res.status(400).json({message: "Username already exists"});
          }
      }
      else {
          console.log(err);
          return res.status(500).json(err);
      }
  })       
});

// async function hashPassword (password) {
//     const saltRounds = 11;
  
//     const hashedPassword = await new Promise((resolve, reject) => {
//       bcrypt.hash(password, saltRounds, function(err, hash) {
//         if (err) reject(err)
//         resolve(hash)
//       });
//     });
  
//     return hashedPassword;
// }

router.post('/login',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    console.log(req.body);
    var query = "select * from users where username=?";
    connection.query(query,[username],(err,results)=>{
        if(!err){
            if(results.length <= 0){

                return res.status(404).json({message:"Incorrect username or password"});
            }
            // else if(bcrypt.compareSync(user.password, results[0].password)){
            else if(password === results[0].password){
                res.status(200).json(
                    {
                        id: results[0].id,
                        username: results[0].username
                    }
                    );
            }
            else {
                console.log("Incorrect username or password else");
                return res.status(404).json({message:"Incorrect username or password"});
            }
        }
        else {
            return res.status(500).json(err);
        }
    });
});

router.patch('/changePassword',(req,res)=>{
    const username = req.body.username;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    
    var query = "select * from users where username=? and password=?";
    connection.query(query,[username,oldPassword],(err,results)=>{
        if(!err){
            console.log(results);
            if(results.length == 0){
                return res.status(404).json({message:"Incorrect old password"});
            }
            else if(results[0].password == oldPassword){
                query = "update users set password=? where username=?";
                connection.query(query,[newPassword,username],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message:"Password updated successfully"});
                    }
                    else {
                        return res.status(500).json(err);
                    }
                });
            }
            else {
                return res.status(400).json({message:"Something went wrong"});
            }
        }
        else {
            return res.status(500).json(err);
        }
    });

});

router.patch('/updateUsername',(req,res)=>{
    const userID = req.body.userID;
    const username = req.body.username;

    var query = "select * from users where username=?";
    connection.query(query,[username],(err,results)=>{
        if(!err){
            if(results.length > 0){
                return res.status(404).json({message:"Username already exists"});
            }
            else if(results.length == 0)
            {
                var query = "update users set username=? where id=?";
                connection.query(query,[username,userID],(err,results)=>{
                    if(!err){
                        if(results.affectedRows > 0){
                            return res.status(200).json({message:"Password updated successfully"});
                        }
                        else {
                            return res.status(400).json({message:"Something went wrong"});
                        }
                    }
                    else {
                        return res.status(500).json(err);
                    }
                });
            }
            else {
                return res.status(400).json({message:"Something went wrong"});
            }
        }
        else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;