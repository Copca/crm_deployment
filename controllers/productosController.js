import { Productos } from '../models/Productos.js';
import shortid from 'shortid';
import multer from 'multer';
import fs from 'fs';

import path from 'path';
const __dirname = path.resolve();

// Subir Imagenes con Multer
const configuracionMulter = {
	storage: multer.diskStorage({
		destination: (req, file, next) => {
			next(null, path.join(__dirname, '/uploads/'));
		},
		filename: (req, file, next) => {
			const extension = file.mimetype.split('/')[1];
			next(null, `${shortid.generate()}.${extension}`);
		}
	}),
	fileFilter(req, file, next) {
		if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
			// El formato es válido
			next(null, true);
		} else {
			// El formato no es válido
			next(new Error('Formato no válido'), false);
		}
	}
};

// Pasar la confuguracion y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
const subirArchivo = (req, res, next) => {
	upload(req, res, function (error) {
		if (error) {
			res.json({ mensaje: error });
		}
		return next();
	});
};

// POST /productos .- Agrega nuevo producto a la BD
const nuevoProducto = async (req, res, next) => {
	try {
		const producto = new Productos(req.body);

		// Revisa si el request tiene un archivo
		if (req.file.filename) {
			producto.imagen = req.file.filename;
		}

		await producto.save();

		res.json({ mensaje: 'Se agregó un nuevo producto' });
	} catch (error) {
		console.log(error);
		return next();
	}
};

// GET /productos .- Muestra todos los productos
const mostrarProductos = async (req, res, next) => {
	try {
		const productos = await Productos.find();
		res.json(productos);
	} catch (error) {
		console.log(error);
		return next();
	}
};

// GET /productos/:id .- Muestra un producto por su ID
const mostrarProducto = async (req, res, next) => {
	try {
		const { id } = req.params;
		const producto = await Productos.findById(id);

		if (!producto) {
			res.json({ mensaje: 'Ese producto no existe' });
			return next();
		}

		res.json(producto);
	} catch (error) {
		console.log(error);
		return next();
	}
};

// PUT /productos/:id .- Actualizar producto por su ID
const actualizarProducto = async (req, res, next) => {
	try {
		const { id } = req.params;

		// Construir un nuevo producto
		const nuevoProducto = req.body;

		// Verificar si hay imagen nueva
		if (req.file) {
			nuevoProducto.imagen = req.file.filename;
		} else {
			const productoAnterior = await Productos.findById(id);
			nuevoProducto.imagen = productoAnterior.imagen;
		}

		// Se reescribe con la informacion del nuevoProducto
		const producto = await Productos.findOneAndUpdate({ _id: id }, nuevoProducto, {
			new: true
		});

		if (!producto) {
			res.json({ mensaje: 'Ese producto no existe' });
			return next();
		}

		res.json(producto);
	} catch (error) {
		console.log(error);
		return next();
	}
};

// DELETE /productos/:id .- Elimina Productos por ID
const eliminarProducto = async (req, res, next) => {
	try {
		const { id } = req.params;

		// Consulta para eliminar la imagen del servidor
		const productoBorrar = await Productos.findById(id);
		const imagenPath = path.join(__dirname, `/uploads/${productoBorrar.imagen}`);
		fs.unlink(imagenPath, (error) => {
			if (error) {
				console.log(error);
			}
			return;
		});

		await Productos.findByIdAndDelete(id);
		res.json({ mensaje: 'El producto se eliminó correctamente' });
	} catch (error) {
		console.log(error);
		return next();
	}
};

// POST /productos/busqueda/:query
const buscarProducto = async (req, res, next) => {
	try {
		const { query } = req.params;

		const producto = await Productos.find({ nombre: new RegExp(query, 'i') });

		if (!producto.length) {
			res.json({ mensaje: 'Producto no encontrado, intente con otro termino' });
			return next();
		}

		res.json(producto);
	} catch (error) {
		console.log(error);
		return next();
	}
};

export {
	nuevoProducto,
	subirArchivo,
	mostrarProductos,
	mostrarProducto,
	actualizarProducto,
	eliminarProducto,
	buscarProducto
};
