const { Router } = require('express');
const { getTipo, createTipo, updateTipo, deleteTipo } = require('../controllers/tipoControllers');

const router = Router();

router.get('/', getTipo);
router.post('/', createTipo);
router.put('/:id', updateTipo);
router.delete('/:id', deleteTipo);

module.exports = router;