const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProSecondschema = new Schema({
    Photo:String,
    Title: String,
    Details: String,
    Link: String
});


const proSecond = mongoose.model('ProjectSecond',ProSecondschema);

module.exports = proSecond;