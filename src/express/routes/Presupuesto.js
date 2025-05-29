const {models} = require('../../sequelize');

async function getAll(req, res) {
    const presupuestos = await models.presupuesto.findAll();
    res.status(200).json(presupuesto);
}

async function getById(req, res) {
    const id = req.params.id;
    const presupuesto = await models.presupuesto.findBiPk(id);
    if(presupuesto){
        res.status(200).json(presupuesto);
    }else{
        res.status(404).send('Presupuesto no encontrado');
    }
};

async function create(req, res) {
    if(req.body.id){
        res.status(400).send('No se debe proporcionar el ID, ya que la base de datos lo determina automáticamente')
    } else {
        await models.presupuesto.create(req.body);
        res.status(201).end();
    }
};

module.exports = {
    getAll,
    getById,
    create,
};