const { Schema, model } = require('mongoose');

const ProductoraSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
        trim: true
    },

    slogan: {
        type: String,
        trim: true
    },

    descripcion: {
        type: String,
        trim: true
    },

    fechaCreacion: {
        type: Date,
        default: Date.now
    },

    fechaActualizacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Productora', ProductoraSchema);