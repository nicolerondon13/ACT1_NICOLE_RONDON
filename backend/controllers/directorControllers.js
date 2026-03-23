const Director = require('../models/Director');
const { request, response } = require('express');

const getDirector = async (req = request, res = response) => {
    try {
        const directores = await Director.find();
        res.status(200).json(directores);
    } catch (error) {
        console.error('❌ Error al obtener los directores:', error);
        res.status(500).json({
            msg: 'Ocurrió un error al listar los directores'
        });
    }
};

const createDirector = async (req = request, res = response) => {
    try {

        const { nombre } = req.body;

        const directorDB = await Director.findOne({ nombre });

        if (directorDB) {
            return res.status(400).json({
                msg: `El director "${nombre}" ya existe.`
            });
        }

        const director = new Director({ nombre });

        await director.save();

        res.status(201).json(director);

    } catch (error) {
        console.error('❌ Error al crear el director:', error);
        res.status(500).json({
            msg: 'Ocurrió un error al guardar el director'
        });
    }
};

const updateDirector = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre} = req.body;

        const director = await Director.findByIdAndUpdate(
            id,
            { nombre, fechaActualizacion: Date.now() },
            { new: true }
        );

        res.json(director);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar director" });
    }
};

const deleteDirector = async (req, res) => {
    try {
        const {id} = req.params;

        await Director.findByIdAndDelete(id);

        res.json({ msg: "Director eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar director" });
    }
};

module.exports = {
    getDirector,
    createDirector,
    updateDirector,
    deleteDirector
};

