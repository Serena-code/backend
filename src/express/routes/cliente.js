const {models} =require('../../sequelize')

async function getAll(req, res) {
    console.log("GET /api/cliente recibido");
    const cliente = await models.cliente.findAll();
    res.status(200).json(cliente);
};
async function getById(req, res) {
    const id = req.params.id;
    const cliente = await models.cliente.findByPk(id); 
    if (cliente) {
        res.status(200).json(cliente);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
}

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
    if(req.body.id === id) {
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
    await models.cliente.destroy({
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
    getById,
}