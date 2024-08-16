require('dotenv').config()
const multer  = require('multer')
const mongoose = require('mongoose');
var ProFirst = require('../module/Firstproject');
var SecondProj = require('../module/SecondProject');
var ContactDtls = require('../module/contact')
const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "shubhampipaliya25@gmail.com",
      pass: "ijbrkhdxljauutyb",
    },
  });
  
  // HTML body of the email
  const emailBody = `
    <p>Dear contactor,</p>
    <p>Thank you for reaching out to me through my portfolio website. I have received your message and I will get back to you as soon as possible.</p>
    <p>Here's a brief introduction about myself:</p>
    <p>"My name is Shubham Pipaliya, and I am a website backend developer specializing in Node.js, Express.js, and MongoDB. You can reach me at 7817853425."</p>
    <p>Best regards,</p>
    <p>Shubham Pipaliya</p>
    <hr>
    <p><small>Disclaimer: This message and any attachments are intended solely for the use of the individual or entity to whom it is addressed and may contain information that is confidential, privileged, and exempt from disclosure under applicable law. If you are not the intended recipient, please notify the sender immediately by return email and delete this message from your system. Thank you.</small></p>
  `;
  
  // Function to send email
  async function sendEmail(mail) {
    try {
      const info = await transporter.sendMail({
        from: 'shubhampipaliya25@gmail.com',
        to: mail,
        subject: 'Thank you for contacting me!',
        html: emailBody,
      });
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }


exports.ProContactCreate =  async function(req, res, next){
    try {
      console.log(req.body);
      if (!req.body.user_email || !req.body.message) {
        throw new Error("Please enter all required fields");
      }
      await sendEmail(req.body.user_email);
      const contactCR = await ContactDtls.create(req.body);
      res.status(201).json({
        status: "success",
        message: "data create",
        data: contactCR,
      });
    } catch (err) {
      console.error("Error in /createcontact:", err);
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  
exports.ProContactShow = async function(req, res, next) {
    try {
      const Shwcontact = await ContactDtls.find()
      res.status(201).json({
        status:"success",
        message:"data find",
        data:Shwcontact
      })
    } catch (err){
      res.status(404).json({
        status:"fail",
        message:err.message
      })
    }
  }
exports.ProContactUpdate = async function(req, res, next){
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
      const Upcontact = await ContactDtls.findByIdAndUpdate(id,req.body)
      res.status(201).json({
        status:"success",
        message:"data delete succesfuly",
        data:Upcontact
      })
    } catch (err) {
      res.status(404).json({
        status:"failed",
        message:err.message
      })
    }
  }
exports.ProContactDelete = async function(req, res, next){
    try {
      console.log(req.params.id);
      if(!req.params.id){
        throw new Error("not obtained the ID") 
      }
      var id = req.params.id
      const Dltcontact = await ContactDtls.findByIdAndDelete(id)
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