const { Sequelize, DataTypes } = require('sequelize');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'db.sqlite',
	logQueryParameters: true,
	benchmark: true
});

sequelize.define('producto',{
	id:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nombre:{
		type: DataTypes.STRING,
		allowNull: false
	},
	stock:{
		type: DataTypes.INTEGER,
		allowNull: false
	},
	descripcion:{
		type: DataTypes.TEXT,
		allowNull: true
	},
	precio:{
		type: DataTypes.FLOAT,
		allowNull: false
	}
})

sequelize.define('productoPedido',{
	id:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	cantidad:{
		type: DataTypes.INTEGER,
		allowNull: false
	},

})

sequelize.define('cliente',{
	id:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	razonSocial:{
		type: DataTypes.STRING,
		allowNull: false
	},
	nombre:{
		type: DataTypes.STRING,
		allowNull: false
	},
	cuit:{
		type: DataTypes.INTEGER,
		allowNull: false
	},
	email:{
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate:{
			isEmail:true
		}
	}
})

sequelize.define('pedido',{
	id:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	monto:{
		type: DataTypes.FLOAT,
		allowNull: false
	}
})
sequelize.define('presupuesto',{
	id:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	estado:{
		type: DataTypes.BOOLEAN,
		allowNull: false,  // permite true, false o null
  		defaultValue: false // valor por defecto no pagado
	}
})
sequelize.define('pago',{
	id:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	}
})

const {producto, productoPedido, cliente, pedido, presupuesto, pago} = sequelize.models;


pedido.hasOne(presupuesto)
presupuesto.belongsTo(pedido)
presupuesto.hasOne(pago)
pago.belongsTo(presupuesto)

pedido.hasMany(productoPedido);
productoPedido.belongsTo(pedido);

producto.hasMany(productoPedido);
productoPedido.belongsTo(producto);

cliente.hasMany(pedido)
pedido.belongsTo(cliente)



module.exports = sequelize;