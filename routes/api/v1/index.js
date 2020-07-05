const router = require('express').Router()

router.use('/usuarios', require('./usuario'))
router.use('/clientes', require('./clientes'))
router.use('/lojas', require('./loja'))
router.use('/categorias', require('./categoria'))
router.use('/produtos', require('./produto'))
router.use('/avaliacoes', require('./avalicaoes'))
router.use('/variacoes', require('./variacoes'))
router.use('/pedidos', require('./pedidos'))
router.use('/entregas', require('./entregas'))
router.use('/pagamentos', require('./pagamentos'))

module.exports = router