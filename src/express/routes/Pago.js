const {models} = require ('../../sequelize');

async function getAll(req,res) {
    const pagos = await models.pago.findAll();
    res.status(200).json(pagos);
};

async function getById(req, res) {
    const id = req.params.id;
    const pago = await models.pago.findByPk(id);
    if(pago){
        res.status(200).json(pago);
    } else {
        res.status(404).json({message: 'Pago no encontrado'});
    }
};

async function create(req, res) {
    if(req.body.id){
        res.status(400).send('Solicitud incorrecta: No se debe proporcionar el ID, ya que la base de datos lo determina automáticamente')
    } else {
        await models.pago.create(req.body);
        res.status(201).end();
    }
};

module.exports = {
    getAll,
    getById,
    create,
};