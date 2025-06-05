const {models} = require('../../sequelize')

async function getAll(req,res){
    const pedidos = await models.pedido.findAll()
    res.status(200).json(pedidos)
}

async function getById(req,res){
    const id = req.params.id
    const pedido = await models.pedido.findByPk(id)
    if(pedido){
        res.status(200).json(item)
    }else{
        res.status(404).send('404 - Not Found')
    }
}

async function create (req,res){
    if(req.body.id){
        res.status(400).send('Bad request: ID should not be provided, since it is determined automatically by the database.')
    }else{
        await models.pedido.create(req.body)
        res.status(201).end()
    }
}
async function update(req,res){
    const id = req.params.id;
    if(req.body.id === id) {
        const {monto} = req.body
        const updatedata = {monto}
        await models.pedido.update(updatedata, {
            where: {
                id: id
            }
        });
        res.status(200).end();
    } else {
        res.status(400).send(`Bad request: param ID(${id}) does not match body ID (${req.body.id}).`);   
    }
}
async function remove (req,res){
    const id = req.params.id
    await models.pedido.destroy({
        where: {
            id:id
        }
    })
    res.status(200).end()
}
module.exports = {
    getAll,
    getById,
    create,
    remove,
}