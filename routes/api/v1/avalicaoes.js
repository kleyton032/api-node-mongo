const router = require('express').Router();

const AvaliacaoController = require('../../../controllers/AvaliacaoController')
const { LojaValidation } = require('../../../controllers/validacoes/lojaValidation')
const Validation = require('express-validation')
const { AvaliacaoValidation } = require('../../../controllers/validacoes/avaliacaoValidation')
const auth = require('../../auth')

const avaliacaoController = new AvaliacaoController();

//CLIENTE/VISITANTES
router.get('/', Validation(AvaliacaoValidation.index), avaliacaoController.index);
router.get('/:id', Validation(AvaliacaoValidation.show), avaliacaoController.show);
router.post('/', Validation(AvaliacaoValidation.store), avaliacaoController.store);

//ADMIN
router.delete('/:id', auth.required, LojaValidation.admin, Validation(AvaliacaoValidation.remove), avaliacaoController.remove);

module.exports = router