const { models } = require('../../sequelize');

async function getAll (req,res){
    const productos = await models.producto.findAll()
    res.status(200).json(productos)
}

async function getById(req,res) {
    const id = req.params.id
    const producto = await models.producto.findByPk(id)
    if(producto){
        res.status(200).json(producto)
    }else{
        res.status(404).send('404 - Not Found')
    }
}

async function create (req,res){
    if(req.body.id){
        res.status(400).send('Bad request: ID should not be provided, since it is determined automatically by the database.')
    }else{
        console.log(req.body)
        await models.producto.create(req.body)
        res.status(200).end()
    }
}

async function update(req,res){
    const id = req.params.id
    if(req.body.id === id){
        await models.producto.update(req.body,{
            where: {
                id:id
            }
        })
        res.status(200).end()
    }else{
        res.status(400).send('Bad request: param ID does not mach body ID')
    }
}

async function remove(req,res){
    const id = req.params.id
    await models.producto.destroy ({
        where:{
            id:id
        }
    })
    res.status(200).end()
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
}