require('dotenv').config()
var express = require('express')
var router = express.Router();
var cors = require('cors')
const multer  = require('multer')
const mongoose = require('mongoose');
var ProFirst = require('../module/Firstproject');
var SecondProj = require('../module/SecondProject');
var ContactDtls = require('../module/contact')
const nodemailer = require("nodemailer");
const ContactController = require('../controller/Contact')
const FirstProController = require('../controller/FIrstProject')
const SecondProController = require('../controller/SecondProject')


// first project CRUD
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })


router.post('/createfirstPro',upload.single('Photo'),FirstProController.ProFristCreate);

router.get('/ShowfirstPro',FirstProController.ProFristShow);

router.put('/UpdatefirstPro/:id',upload.single('Photo'),FirstProController.ProFristUpdate);

// http://localhost:3000/deletefirstPro?id=${id}
router.delete('/deletefirstPro/:id',FirstProController.ProFristDelete);



// second project CRUD
router.post('/createSecondPro',upload.single('Photo'),SecondProController.ProSecondCreate);

router.get('/ShowSecondPro',SecondProController.ProSecondShow);

router.put('/UpdateSecondPro/:id',upload.single('Photo'),SecondProController.ProSecondUpdate);

// http://localhost:3000/deleteSecondPro?id=${id}
router.delete('/deleteSecondPro/:id',SecondProController.ProSecondDelete);


// contact
router.post('/createcontact',ContactController.ProContactCreate);

router.get('/Showcontact',ContactController.ProContactShow);

router.put('/Updatecontact/:id',ContactController.ProContactUpdate);
// http://localhost:3000/deleteSecondPro?id=${id}
router.delete('/deletecontact/:id',ContactController.ProContactDelete);


module.exports = router;
