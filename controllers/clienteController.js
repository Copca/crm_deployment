import { Clientes } from '../models/Clientes.js';

// POST /clientes .- Agrea nuevo cliente a la BD
const nuevoCliente = async (req, res, next) => {
	try {
		const cliente = new Clientes(req.body);

		await cliente.save();

		res.json({ mensaje: 'Se agregó un nuevo cliente' });
	} catch (error) {
		console.log(error);
		// res.send(error);
		res.json({ error: 'El correo ya esta registrado' });
		return next();
	}
};
// GET /clientes .- Muestra todos los clientes
const mostrarClientes = async (req, res, next) => {
	try {
		const clientes = await Clientes.find();
		res.json(clientes);
	} catch (error) {
		console.log(error);
		return next();
	}
};

// GET /clientes/:id .- Muestra un cliente por su ID
const mostrarCliente = async (req, res, next) => {
	try {
		const { id } = req.params;
		const cliente = await Clientes.findById(id);

		if (!cliente) {
			res.json({ mensaje: 'Ese cliente no existe' });
			return next();
		}

		res.json(cliente);
	} catch (error) {
		console.log(error);
		return next();
	}
};

// PUT /clientes/:id .- Actualiza un cliente por su ID
const actualizarCliente = async (req, res, next) => {
	try {
		const { id } = req.params;

		const cliente = await Clientes.findOneAndUpdate({ _id: id }, req.body, {
			new: true
		});

		if (!cliente) {
			res.json({ error: 'Ese cliente no existe' });
			return next();
		}

		res.json(cliente);
	} catch (error) {
		console.log(error);
		// res.send(error);
		res.json({ error: 'Hubo un error' });
		return next();
	}
};

// DELETE /clientes/:id .- Elimina un cliente de la BD
const eliminarCliente = async (req, res, next) => {
	try {
		const { id } = req.params;

		const cliente = await Clientes.findOneAndDelete({ _id: id });

		if (!cliente) {
			res.json({ error: 'Ese cliente no existe' });
			return next();
		}

		res.json({ mensaje: 'El cliente se eliminó correctamente' });
	} catch (error) {
		console.log(error);
		return next();
	}
};

export {
	nuevoCliente,
	mostrarClientes,
	mostrarCliente,
	actualizarCliente,
	eliminarCliente
};
