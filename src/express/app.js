const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = {
    cliente: require('./routes/cliente'),
    pago: require('./routes/pago'),
    pedido: require('./routes/pedido'),
    presupuesto: require('./routes/presupuesto'),
    producto: require('./routes/producto')
}

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/cliente',routes.cliente.getAll)
app.post('/api/cliente',routes.cliente.create)
app.put('/api/cliente/:id',routes.cliente.update)
app.delete('/api/cliente/:id',routes.cliente.remove)
app.get('/api/cliente/:id', routes.cliente.getById)

app.get('/api/pago', routes.pago.getAll)
app.get('/api/pago/:id', routes.pago.getById)
app.post('/api/pago', routes.pago.create)

app.get('/api/pedido', routes.pedido.getAll)
app.get('/api/pedido/:id', routes.pedido.getById)
app.post('/api/pedido', routes.pedido.create)
app.post('/api/pedido/:id/producto',routes.pedido.addProducto)
app.put('/api/pedido/:id',routes.pedido.update)
app.delete('/api/pedido/:id', routes.pedido.remove)

app.get('/api/presupuesto',routes.presupuesto.getAll)
app.get('/api/presupuesto/:id',routes.presupuesto.getById)
app.post('/api/presupuesto',routes.presupuesto.create)
app.put('/api/presupuesto/:id',routes.presupuesto.update)

app.get('/api/producto', routes.producto.getAll)
app.get('/api/producto/:id', routes.producto.getById)
app.post('/api/producto',routes.producto.create)
app.put('/api/producto/:id',routes.producto.update)
app.delete('/api/producto/:id',routes.producto.remove)


module.exports = app;