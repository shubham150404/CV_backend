const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProFistschema = new Schema({
    Photo:String,
    Title: String,
    Details: String,
    Link: String
});


const profirst = mongoose.model('ProjectFirst',ProFistschema);

module.exports = profirst;