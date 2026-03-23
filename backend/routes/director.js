const { Router } = require('express');
const { getDirector, createDirector, updateDirector, deleteDirector} = require('../controllers/directorControllers');

const router = Router();

router.get('/', getDirector);
router.post('/', createDirector);
router.put('/:id', updateDirector);
router.delete('/:id', deleteDirector);

module.exports = router;