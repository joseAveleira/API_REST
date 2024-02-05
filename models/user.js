var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    alias: String,
    pass: String

});
// Importante el nombre de la colección en SINGULAR
module.exports = mongoose.model('user', UserSchema);
