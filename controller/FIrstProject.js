require('dotenv').config()
const multer  = require('multer')
const mongoose = require('mongoose');
var ProFirst = require('../module/Firstproject');
var SecondProj = require('../module/SecondProject');
var ContactDtls = require('../module/contact')
const nodemailer = require("nodemailer");


exports.ProFristCreate  =  async function(req, res, next){
    try {
      console.log(req.file);
      console.log(req.body);
      if(!req.file || !req.body.Title || !req.body.Details || !req.body.Link ){
        throw new Error("Please Enter the filed")
      }
      req.body.Photo = req.file.filename
      const FPcreate = await ProFirst.create(req.body)
      res.status(201).json({
        status:"success",
        message:"data create",
        data:FPcreate
      })
    } catch (err) {
      res.status(404).json({
        status:"fail",
        message:err.message
      })
    }
  }
exports.ProFristShow = async function(req, res, next) {
    try {
      const FPdetails = await ProFirst.find()
      res.status(201).json({
        status:"success",
        message:"data find",
        data:FPdetails
      })
    } catch (err){
      res.status(404).json({
        status:"fail",
        message:err.message
      })
    }
  }
exports.ProFristUpdate = async function(req, res, next){
    try {
      console.log(req.params.id);
      req.body.Photo = req.file.filename
      console.log(req.body);
      console.log(req.file.filename);
      if(!req.params.id){
        throw new Error("not obtained the ID") 
      }
      if(!req.body){
        throw new Error("Please Enter the filed")
      }
      var id = req.params.id
      const updFp = await ProFirst.findByIdAndUpdate(id,req.body)
      res.status(201).json({
        status:"success",
        message:"data update succesfuly",
        data:updFp
      })
    } catch (err) {
      res.status(404).json({
        status:"failed",
        message:err.message
      })
    }
  }
exports.ProFristDelete = async function(req, res, next){
    try {
      console.log(req.params.id);
      if(!req.params.id){
        throw new Error("not obtained the ID") 
      }
      var id = req.params.id
      const dltFp = await ProFirst.findByIdAndDelete(id)
      res.status(201).json({
        status:"success",
        message:"data delete succesfuly"
      })
    } catch (err) {
      res.status(404).json({
        status:"failed",
        message:err.message
      })
    }
  }