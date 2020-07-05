const router = require("express").Router();

const VariacaoController = require("../../../controllers/VariacaoController");

const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation");
const auth = require("../../auth");
const upload = require("../../../config/multer");
const { VariacaiValidation } = require('../../../controllers/validacoes/variacaoValidation');
const Validation = require('express-validation');

const variacaoController = new VariacaoController();

router.get("/", Validation(VariacaiValidation.index), variacaoController.index);
router.get("/:id", Validation(VariacaiValidation.show), variacaoController.show);

router.post("/", auth.required, LojaValidation.admin, Validation(VariacaiValidation.store), variacaoController.store);
router.put("/:id", auth.required, LojaValidation.admin, Validation(VariacaiValidation.update), variacaoController.update);
router.put("/images/:id", auth.required, LojaValidation.admin, Validation(VariacaiValidation.updateImages), upload.array("files", 4), variacaoController.updateImages);
router.delete("/:id", auth.required, LojaValidation.admin, Validation(VariacaiValidation.remove), variacaoController.remove);

module.exports = router;