const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    nombre: String,
    imagen: String,
    marca: String,
    historial: []
})

module.exports = mongoose.model('Product', ProductSchema);

