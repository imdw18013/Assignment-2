var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const User = require("../models/user")

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// retrive perticualr user details
router.post('/login', function (req, res, next) {
  console.log(req.body)
  body = req.body;
  User.find({emailId:body.emailId, password:body.password},(error,userDetail)=>{
    if (error) {
      res.status(500).send({ "status": false, "message": "failed to get user details.", "details": error });
    } else {
      if(userDetail.length == 0){
        res.status(200).send({ "status": false, "message": "Please check email id and password.", "details": "" })
      }else{
        res.status(200).send({ "status": true, "message": "User found with this email id. ", "details": userDetail })
       
      }
    }
  })
});


// retrive all user details
router.get('/getall', function (req, res, next) {
  User.find({},(error,users)=>{
    if (error) {
      res.status(500).send({ "status": false, "message": "failed to get all user details.", "details": error });
    } else {
      if(users.length == 0){
        res.status(200).send({ "status": true, "message": "No user found", "details": "" })
      }
      res.status(200).send({ "status": true, "message": "Users found successfully", "details": users })
    }
  })
});

// retrive perticualr user details
router.get('/getDetails', function (req, res, next) {
  body = req.body;
  User.find({emailId:body.emailId},(error,userDetail)=>{
    if (error) {
      res.status(500).send({ "status": false, "message": "failed to get user details.", "details": error });
    } else {
      if(userDetail.length == 0){
        res.status(200).send({ "status": false, "message": "User not found with this email id.", "details": "" })
      }else{
        res.status(200).send({ "status": true, "message": "User found with this email id. ", "details": userDetail })
       
      }
    }
  })
});

// add new user
router.post('/add', function (req, res, next) {
  console.log('request body', req.body)
  User.create({
    name: req.body.name,
    emailId: req.body.emailId,
    password: req.body.password,
    type:req.body.type
  }, (error, userDetails) => {
    if (error) {
      res.status(500).send({ "status": false, "message": "failed to store user details.", "details": error });
    } else {
      res.status(200).send({ "status": true, "message": "User created successfully", "details": userDetails })
    }
  });
});

//delete user
router.delete('/delete', function (req, res, next) {
  body = req.body;
  User.deleteOne({ emailId: body.emailId }, (error) => {
    if (error) {
      console.log("Error while deleteing user record ", error)
      res.status(500).send({ "status": false, "message": "failed to delete user details.", "details": error })
    } else {
      res.status(200).send({ "status": true, "message": "User deleted successfully", "details": "" })
    }
  })
});

// update user details
router.get('/update', function (req, res, next) {
  User.findOneAndUpdate({emaiId:body.emailId},{name:body.name},(error,details)=>{
    if(error){
      res.status(500).send({ "status": true, "message": "Updating user details failed", "details": error })
    }else{
      res.status(200).send({ "status": true, "message": "User updated successfully", "details": details })
    }
  });
});

//update user password
router.post('/updatePassword', function (req, res, next) {
  body = req.body;
  User.findOneAndUpdate({emaiId:body.emailId},{password:body.password},(error,details)=>{
    if(error){
      res.status(500).send({ "status": true, "message": "Updating user details failed", "details": details })
    }else{
      res.status(200).send({ "status": true, "message": "User updated successfully", "details": "" })
    }
  });
});

module.exports = router;
