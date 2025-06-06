const {models} = require('../../sequelize');

async function getAll(req, res) {
    const presupuestos = await models.presupuesto.findAll();
    res.status(200).json(presupuestos);
}

async function getById(req, res) {
    const id = req.params.id;
    const presupuesto = await models.presupuesto.findByPk(id);
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

async function update(req,res){
    const id = req.params.id
    if(req.body.id === id){
        await models.presupuesto.update(req.body,{
            where: {
                id:id
            }
        })
        res.status(200).end()
    }else{
        res.status(400).send('Bad request: param ID does not mach body ID')
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update
};