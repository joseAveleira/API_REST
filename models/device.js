var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// definimos el esquema de nuestro modelo de datos
var DeviceSchema = new Schema({
    type: String,
    name: String,
    description: String,
    unit: String,
    value: Number
});
// importante nombre de la colección en SINGULAR
module.exports = mongoose.model('device', DeviceSchema);
