const express = require('express');
const bodyParser = require('body-parser');

const routes = {
    cliente: require('./routes/cliente'),
    pago: require('./routes/Pago'),
    pedido: require('./routes/pedido'),
    presupuesto: require('./routes/presupuesto'),
    producto: require('./routes/producto')
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/cliente',routes.cliente.getAll)
app.post('/api/cliente',routes.cliente.create)
app.put('/api/cliente',routes.cliente.update)
app.delete('/api/cliente',routes.cliente.remove)

app.get('/api/pago', routes.pago.getAll)
app.get('/api/pago', routes.pago.getById)
app.post('/api/pago', routes.pago.create)

app.get('/api/pedido', routes.pedido.getAll)
app.get('/api/pedido', routes.pedido.getById)
app.post('/api/pedido', routes.pedido.create)
app.put('/api/pedido',routes.pedido.update)
app.delete('/api/pedido', routes.pedido.remove)

app.get('/api/presupuesto',routes.presupuesto.getAll)
app.get('/api/presupuesto',routes.presupuesto.getById)
app.post('/api/presupuesto',routes.presupuesto.create)

app.get('/api/producto', routes.producto.getAll)
app.get('/api/producto', routes.producto.getById)
app.post('/api/producto',routes.producto.create)
app.put('/api/producto',routes.producto.update)
app.delete('/api/producto',routes.producto.remove)


app.module.exports = app;