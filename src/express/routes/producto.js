let productos = []

export const getAllProducts = (req, res) => {
    res.status(200).json(productos);
}

export const addProducts = (req, res) => {
    const { nombre = null, precio = null, stock = null, descripcion = null} = req.body;
    if(!nombre || !precio || !stock || !descripcion){
        return res.status(400).json({ message: 'Todos los campos son requeridos'});
    }
    const nuevoProducto = {
        id: productos.lenght + 1,
        nombre,
        precio,
        stock,
        descripcion
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
}

export const actualizarProducto = (req, res) => {
    const {idProducto} = req.params;
    const productIndex = productos.findIndex(producto => producto.id === parseInt(idProducto));

    if(productIndex === -1){
        return res.status(400).json({ message: 'Producto no encontrado'});
    }

    const {nombre, precio, stock, descripcion} = req.body;
    if(!nombre || !precio || !stock || !descripcion){
        return res.status(400).json({ message: 'Todos los campos son requeridos'})
    }
    productos[productIndex] = {id: parseInt(idProducto), nombre, precio, stock, descripcion};
    res.status(200).json(productos[productIndex]);
}

export const eliminarProducto = (req, res) => {
    const { idProducto } = req.params;
    const productIndex = productos.findIndex(producto => producto.id === parseInt(idProducto));
    
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    productos.splice(productIndex, 1);
    res.status(204).send();
}