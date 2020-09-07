const mongoose = require('mongoose')

const Pets = mongoose.model('Pet', {
    nombre: String,
    tipo: String,
    descripción: String,
})

module.exports = Pets
