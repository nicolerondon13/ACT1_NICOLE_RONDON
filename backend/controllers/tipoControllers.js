const { request, response } = require('express');
const Tipo = require('../models/Tipo');

const getTipo = async (req = request, res = response) => {
    try {
        const tipo = await Tipo.find();
        res.status(200).json(tipo);
    } catch (error) {
        console.error('❌ Error al obtener los tipos:', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar los tipos' });
    }
};

const createTipo = async (req = request, res = response) => {
    try {
        const { nombre, descripcion } = req.body;

        const tipoDB = await Tipo.findOne({ nombre });

        if (tipoDB) {
            return res.status(400).json({
                msg: `El tipo "${nombre}" ya existe.`
            });
        }

        const tipo = new Tipo({ nombre, descripcion });

        await tipo.save();

        res.status(201).json(tipo);

    } catch (error) {
        console.error('❌ Error al crear el tipo:', error);
        res.status(500).json({
            msg: 'Ocurrió un error al guardar el tipo'
        });
    }
};

const updateTipo = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre, descripcion } = req.body;

        const tipo = await Tipo.findByIdAndUpdate(
            id,
            { nombre, descripcion, fechaActualizacion: Date.now() },
            { new: true }
        );

        res.json(tipo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar tipo" });
    }
};

const deleteTipo = async (req, res) => {
    try {
        const {id} = req.params;

        await Tipo.findByIdAndDelete(id);

        res.json({ msg: "Tipo eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar el tipo" });
    }
};

module.exports = {
    getTipo,
    createTipo,
    updateTipo,
    deleteTipo
};
