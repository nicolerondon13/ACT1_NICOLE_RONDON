const {request, response} = require ('express');
const Media = require('../models/Media');

const getMedia = async (req, res) => {
    try {
        const medias = await Media.find()
            .populate("genero")
            .populate("director")
            .populate("productora")
            .populate("tipo");

        res.status(200).json(medias);
    } catch (error) {
        console.error('❌ Error al obtener media:', error);
        res.status(500).json({ msg: 'Error al listar media' });
    }
};

const createMedia = async (req, res) => {
    try {
        const data = req.body;

        const media = new Media(data);
        await media.save();

        res.status(201).json(media);

    } catch (error) {
        console.error('❌ Error al crear media:', error);
        res.status(500).json({
            msg: 'Error al guardar media',
            error
        });
    }
};

const updateMedia = async (req, res) => {
    try {
        const { id } = req.params;

        const media = await Media.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.json(media);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar media" });
    }
};

const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;

        await Media.findByIdAndDelete(id);

        res.json({ msg: "Media eliminada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar media" });
    }
};

module.exports = {
    getMedia,
    createMedia,
    updateMedia,
    deleteMedia
};