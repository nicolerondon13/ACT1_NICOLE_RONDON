const { Router } = require('express');
const { getProductora, createProductora, updateProductora, deleteProductora } = require('../controllers/productoraControllers');

const router = Router();

router.get('/', getProductora);
router.post('/', createProductora);
router.put('/:id', updateProductora);
router.delete('/:id', deleteProductora);

module.exports = router;