const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
    serial: {
        type: String,
        required: [true, 'El serial es obligatorio'],
        unique: true,
        trim: true
    },

    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },

    sinopsis: {
        type: String,
        required: [true, 'La sinopsis es obligatoria'],
        trim: true
    },

    url: {
        type: String,
        required: [true, 'La URL es obligatoria'],
        unique: true,
        trim: true
    },

    imagen: {
        type: String,
        required: [true, 'La imagen es obligatoria'],
    },

    anioEstreno: {
        type: Number,
        required: [true, 'El año de estreno es obligatorio'],
    },

    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },

    // 🔗 Relaciones
    genero: {
        type: Schema.Types.ObjectId,
        ref: "Genero",
        required: true,
    },

    director: {
        type: Schema.Types.ObjectId,
        ref: "Director",
        required: true,
    },

    productora: {
        type: Schema.Types.ObjectId,
        ref: "Productora",
        required: true,
    },

    tipo: {
        type: Schema.Types.ObjectId,
        ref: "Tipo",
        required: true,
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

module.exports = model('Media', MediaSchema);