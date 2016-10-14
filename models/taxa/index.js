var mongoose = require('mongoose');
var taxSchema = new mongoose.Schema({
    name: String, //name of the user
    desc: String,
    parent: String,
    synaps:[String]

}, { collection: 'Taxa' });


mongoose.model('Taxa', taxSchema);