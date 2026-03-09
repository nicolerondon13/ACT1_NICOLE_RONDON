const { Router } = require('express');
const { getProductora, createProductora } = require('../controllers/productoraControllers');

const router = Router();

router.get('/', getProductora);
router.post('/', createProductora);

module.exports = router;