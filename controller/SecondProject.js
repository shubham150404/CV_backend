require('dotenv').config()
const multer  = require('multer')
const mongoose = require('mongoose');
var ProFirst = require('../module/Firstproject');
var SecondProj = require('../module/SecondProject');
var ContactDtls = require('../module/contact')
const nodemailer = require("nodemailer");


exports.ProSecondCreate = async function(req, res, next){
    try {
      console.log(req.body);
      if(!req.file || !req.body.Title || !req.body.Details || !req.body.Link ){
        throw new Error("Please Enter the filed")
      }
      req.body.Photo = req.file.filename
      const SPcreate = await SecondProj.create(req.body)
      res.status(201).json({
        status:"success",
        message:"data create",
        data:SPcreate
      })
    } catch (err) {
      res.status(404).json({
        status:"fail",
        message:err.message
      })
    }
  }

exports.ProSecondShow = async function(req, res, next) {
    try {
      const SPdetails = await SecondProj.find()
      // console.log(SPdetails)
      res.status(201).json({
        status:"success",
        message:"data find",
        data:SPdetails
      })
    } catch (err){
      res.status(404).json({
        status:"fail",
        message:err.message
      })
    }
  }


exports.ProSecondUpdate =async function(req, res, next){
    try {
      console.log(req.params.id);
      console.log(req.body);
      if(!req.params.id){
        throw new Error("not obtained the ID") 
      }
      if(!req.body){
        throw new Error("Please Enter the filed")
      }
      var id = req.params.id
      req.body.Photo = req.file.filename
      const updSp = await SecondProj.findByIdAndUpdate(id,req.body)
      res.status(201).json({
        status:"success",
        message:"data delete succesfuly",
        data:updSp
      })
    } catch (err) {
      res.status(404).json({
        status:"failed",
        message:err.message
      })
    }
  }

exports.ProSecondDelete =  async function(req, res, next){
    try {
      console.log(req.params.id);
      if(!req.params.id){
        throw new Error("not obtained the ID") 
      }
      var id = req.params.id
      const dltSp = await SecondProj.findByIdAndDelete(id)
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