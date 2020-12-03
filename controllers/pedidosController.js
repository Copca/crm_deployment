import { Pedidos } from '../models/Pedidos.js';

// POST /pedidos .- Agrega nuevo pedido a la BD
const nuevoPedido = async (req, res, next) => {
	try {
		const pedido = new Pedidos(req.body);
		await pedido.save();
		res.json({ mensaje: 'Se agregó un nuevo pedido' });
	} catch (error) {
		console.log(error);
		return next();
	}
};

// GET /pedidos .- Muestra todos los pedidos
const mostrarPedidos = async (req, res, next) => {
	try {
		const pedidos = await Pedidos.find().populate('cliente').populate({
			path: 'pedido.producto',
			model: 'Productos'
		});
		res.json(pedidos);
	} catch (error) {
		console.log(error);
		return next();
	}
};

// GET /pedidos:id .- Muestra un pedido por su ID
const mostrarPedido = async (req, res, next) => {
	try {
		const { id } = req.params;
		const pedido = await Pedidos.findById(id).populate('cliente').populate({
			path: 'pedido.producto',
			model: 'Productos'
		});

		res.json(pedido);
	} catch (error) {
		console.log(error);
		res.json({ mensaje: 'Ese pedido no existe' });
		return next();
	}
};

// PUT /pedidos/:id Actualizar un pedido por su ID
const actualizarPedido = async (req, res, next) => {
	try {
		const { id } = req.params;
		const pedido = await Pedidos.findByIdAndUpdate(id, req.body, {
			new: true
		})
			.populate('cliente')
			.populate({
				path: 'pedido.producto',
				model: 'Productos'
			});

		res.json(pedido);
	} catch (error) {
		console.log(error);
		res.json({ mensaje: 'Ese pedido no existe' });
		return next();
	}
};

// PUT /pedidos/:id .-  Elimina un pedido
const eliminarPedido = async (req, res, next) => {
	try {
		const { id } = req.params;
		await Pedidos.findByIdAndDelete(id);
		res.json({ mensaje: 'El pedido se eliminó correctamente' });
	} catch (error) {
		console.log(error);
		res.json({ mensaje: 'Ese pedido no existe' });
		return next();
	}
};

export { nuevoPedido, mostrarPedidos, mostrarPedido, actualizarPedido, eliminarPedido };
