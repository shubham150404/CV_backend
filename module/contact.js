const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contactschema = new Schema({
    user_email:String,
    message:String
});


const contact = mongoose.model('contact',contactschema);

module.exports = contact;