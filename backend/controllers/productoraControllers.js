const { request, response } = require('express');
const Productora = require('../models/Productora');

const getProductora = async (req = request, res = response) => {
    try {
        const productora = await Productora.find();
        res.status(200).json(productora);
    } catch (error) {
        console.error('❌ Error al obtener productoras:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar las productoras' });
    }
};

const createProductora = async (req = request, res = response) => {
    try {
        const { nombre, descripcion } = req.body;

        const productoraDB = await Productora.findOne({ nombre });

        if (productoraDB) {
            return res.status(400).json({
                msg: `La productora "${nombre}" ya existe.`
            });
        }

        const productora = new Productora({ nombre, descripcion });

        await productora.save();

        res.status(201).json(productora);

    } catch (error) {
        console.error('❌ Error al crear la productora:', error);
        res.status(500).json({
            msg: 'Ocurrió un error al guardar el género'
        });
    }
};

module.exports = {
    getProductora,
    createProductora
};