const mongoose = require('mongoose');
const Loja = mongoose.model('Loja');

class LojaController {

    index(req, res, next) {
        Loja.find({}).select("_id nome cnpj email telefones endereco").then((lojas) => {
            return res.send({ lojas });
        }).catch(next);

    }

    show(req, res, next) {
        Loja.findById(req.params.id).select("_id nome cnpj email telefones endereco").then((loja) => {
            return res.send({ loja });
        }).catch((error) =>{
            console.log(error)
            next(error)
        });
    }

    store(req, res, next) {
        const { nome, cnpj, email, telefones, endereco } = req.body;

        const error = [];
        if (!nome) error.push("nome");
        if (!cnpj) error.push("cnpj");
        if (!email) error.push("email");
        if (!telefones) error.push("telefones");
        if (!endereco) error.push("endereco");
        if (error.length > 0) {
            return res.status(422).json({ error: "required", payload: error });
        }

        const loja = new Loja({nome, cnpj, email, telefones, endereco});
        loja.save().then((loja) => {
            res.send({ loja });
        }).catch((error) =>{
            console.log(error)
            next(error)
        });
    }

    update(req, res, next) {
        const { nome, cnpj, email, telefones, endereco } = req.body;

        Loja.findById(req.query.loja).then((loja) => {
            if (!loja) return res.status(422).send({ error: "Loja não existe." });

            if (nome) loja.nome = nome;
            if (cnpj) loja.cnpj = cnpj;
            if (email) loja.email = email;
            if (telefones) loja.telefones = telefones;
            if (endereco) loja.endereco = endereco;

            loja.save().then(() => res.send({ loja })).catch(next)

        }).catch((err)=>{
            console.log(err);
            next(err);
        })
    }

    remove(req, res, next){
        Loja.findById(req.query.loja).then((loja) => {
            if (!loja) return res.status(422).send({ error: "Loja não existe." });

            loja.remove().then(()=> res.send({deletado: true})).catch(next);
        }).catch((err)=>{
            console.log(err);
            next(err);
        })
    }
}

module.exports = LojaController;