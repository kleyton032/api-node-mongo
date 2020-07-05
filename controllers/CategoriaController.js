const mongoose = require('mongoose')

const Categoria = mongoose.model("Categoria")
const Produto = mongoose.model("Produto")

class CategoriaController {

    async index(req, res, next) {
        try {
            const categorias = await Categoria.find({ loja: req.query.loja }).select("_id produtos nome codigo loja")
           return res.send({ categorias })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async indexDisponiveis(req, res, next) {
        try {
            const categorias = await Categoria.find({ loja: req.query.loja, disponibilidade: true }).select("_id produtos nome codigo loja")
            return res.send({ categorias })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async show(req, res, next) {
        try {
            const categoria = await Categoria.findOne({ loja: req.query.loja, _id: req.params.id }).select("_id produtos nome codigo loja").populate(["produtos"])
            return res.send({ categoria })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async store(req, res, next){
        try {
            const {nome, codigo} = req.body
            const {loja} = req.query

            const categoria = new Categoria({nome, codigo, loja, disponibilidade: true})

            await categoria.save()
            return res.send({categoria})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async update(req, res, next){
        const { nome, codigo, disponibilidade, produtos} = req.body;
        try {
            const categoria = await Categoria.findById(req.params.id)
            if(nome) categoria.nome = nome
            if(disponibilidade !== undefined) categoria.disponibilidade = disponibilidade
            if(codigo) categoria.codigo = codigo
            if(produtos) categoria.produtos = produtos
            await categoria.save()
            return res.send({categoria})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async remove(req, res, next){
        try {
            const categoria = Categoria.findById(req.params.id)
            await categoria.remove()
            return res.send({delatado: true})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    /**
     * PRODUTOS
     */

    async showProdutos(req,res,next){
        const { offset, limit } = req.query;
        try {
            const produtos = await Produto.paginate(
                { categoria: req.params.id },
                { offset: Number(offset) || 0, limit: Number(limit) || 30 }
            );
            return res.send({ produtos });
        } catch(e){
            next(e);
        }
    }

     async updateProdutos(req,res,next){
        try {
            const categoria = await Categoria.findById(req.params.id);
            const { produtos } = req.body;
            if(produtos) categoria.produtos = produtos;
            await categoria.save();

            let _produtos = await Produto.find({
                $or: [
                    { categoria: req.params.id },
                    { _id: { $in: produtos } }
                ]
            });
            _produtos = await Promise.all(_produtos.map(async (produto) => {
                if(!produtos.includes(produto._id.toString())){
                    produto.categoria = null;
                } else {
                    produto.categoria = req.params.id;
                }
                await produto.save();
                return produto;
            }));

            const resultado = await Produto.paginate({ categoria: req.params.id }, { offset: 0, limit: 30 });
            return res.send({ produtos: resultado });
        }catch(e){
            next(e);
        }
    }

}

module.exports = CategoriaController;