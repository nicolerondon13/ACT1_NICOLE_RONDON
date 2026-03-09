const { request, response } = require('express');
const Genero = require('../models/Genero');

const getGeneros = async (req = request, res = response) => {
    try {
        const generos = await Genero.find();
        res.status(200).json(generos);
    } catch (error) {
        console.error('❌ Error al obtener generos:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar los géneros' });
    }
};

const createGenero = async (req = request, res = response) => {
    try {
        const { nombre, descripcion } = req.body;

        const generoDB = await Genero.findOne({ nombre });

        if (generoDB) {
            return res.status(400).json({
                msg: `El género "${nombre}" ya existe.`
            });
        }

        const genero = new Genero({ nombre, descripcion });

        await genero.save();

        res.status(201).json(genero);

    } catch (error) {
        console.error('❌ Error al crear el genero:', error);
        res.status(500).json({
            msg: 'Ocurrió un error al guardar el género'
        });
    }
};

module.exports = {
    getGeneros,
    createGenero
};

module.exports = {
    getGeneros,
    createGenero
}
