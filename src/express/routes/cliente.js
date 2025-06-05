const {models} =require('../../sequelize')

async function getAll(req, res) {
    const cliente = await models.cliente.findAll();
    res.status(200).json(cliente);
};

async function create(req, res) {
    if (req.body.id) {
        res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database`)
    } else {
        await models.cliente.create(req.body);
        res.status(201).end();
    }
};

async function update(req,res) {
    const id = req.params.id;
    if(req.bosy.id === id) {
        await models.cliente.update(req.body, {
            where: {
                id: id
            }
        });
        res.status(200).end();
    } else {
        res.status(400).send(`Bad request: param ID(${id}) does not match body ID (${req.body.id}).`);   
    }
};

async function remove(req,res) {
    const id = req.params.id;
<<<<<<< HEAD
    await models.cliente.destroy({as
=======
    await models.cliente.destroy({
>>>>>>> 30ebe2da0f5f2ffdd10088f69649845bf656931f
        where: {
            id:id
        }
    });
    res.status(200).end();
};

module.exports = {
    getAll,
    create,
    update,
    remove,
}