const Productora = require('../models/Productora');
const { request, response } = require('express');

const getProductora = async (req = request, res = response) => {
    try {
        const productoras = await Productora.find();
        res.status(200).json(productoras);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al listar productoras' });
    }
};

const createProductora = async (req = request, res = response) => {
    try {
        console.log("BODY:", req.body);

        const { nombre, slogan, descripcion } = req.body;

        const existe = await Productora.findOne({ nombre });

        if (existe) {
            return res.status(400).json({
                msg: `La productora "${nombre}" ya existe`
            });
        }

        const productora = new Productora({
            nombre,
            slogan,
            descripcion
        });

        await productora.save();

        res.status(201).json(productora);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al guardar la productora'
        });
    }
};

const updateProductora = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre, slogan, descripcion } = req.body;

        const productora = await Productora.findByIdAndUpdate(
            id,
            { nombre, slogan, descripcion, fechaActualizacion: Date.now() },
            { new: true }
        );

        res.json(productora);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar productora" });
    }
};

const deleteProductora = async (req, res) => {
    try {
        const {id} = req.params;

        await Productora.findByIdAndDelete(id);

        res.json({ msg: "Productora eliminada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar productora" });
    }
};

module.exports = {
    getProductora,
    createProductora,
    updateProductora,
    deleteProductora
};