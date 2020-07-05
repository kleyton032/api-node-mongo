const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvaliacaoSchema = Schema({
    nome: {type: String, required: true},
    texto: {type: String, required: true},
    pontuacao:{type:Number, default: 1},
    produto:{type: Schema.Types.ObjectId, ref: "Produto"},
    loja:{type: Schema.Types.ObjectId, ref: "Loja"}
})

module.exports = mongoose.model("Avaliacao", AvaliacaoSchema)