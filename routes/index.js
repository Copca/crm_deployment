import express from 'express';
import {
	nuevoCliente,
	mostrarClientes,
	mostrarCliente,
	actualizarCliente,
	eliminarCliente
} from '../controllers/clienteController.js';

import {
	nuevoProducto,
	subirArchivo,
	mostrarProductos,
	mostrarProducto,
	actualizarProducto,
	eliminarProducto,
	buscarProducto
} from '../controllers/productosController.js';

import {
	nuevoPedido,
	mostrarPedidos,
	mostrarPedido,
	actualizarPedido,
	eliminarPedido
} from '../controllers/pedidosController.js';

import {
	registrarUsuario,
	autenticarUsuario
} from '../controllers/usuariosController.js';

import { auth } from '../middleware/auth.js';

const router = express.Router();

/***********
 * CLIENTES
 */
// Agrega nuevos clietes via POST
router.post('/clientes', auth, nuevoCliente);

// Obtener todos los cliente
router.get('/clientes', auth, mostrarClientes);

// Mostrar un cliente por su ID
router.get('/clientes/:id', auth, mostrarCliente);

// Actualizar cliente
router.put('/clientes/:id', auth, actualizarCliente);

// Elimina un cliente
router.delete('/clientes/:id', auth, eliminarCliente);

/*************
 * PRODUCTOS
 */
// Agrega un Producto a la BD
router.post('/productos', auth, subirArchivo, nuevoProducto);

// mostrar todos los productos
router.get('/productos', auth, mostrarProductos);

// Mostrar producto por su ID
router.get('/productos/:id', auth, mostrarProducto);

// Actualizar Producto por su ID
router.put('/productos/:id', auth, subirArchivo, actualizarProducto);

// Eliminar producto
router.delete('/productos/:id', auth, eliminarProducto);

// Busqueda de productos
router.post('/productos/busqueda/:query', auth, buscarProducto);

/*********************
 * PEDIDOS
 */
// Agregar peedido a la BD
router.post('/pedidos/nuevo/:idUsuario', auth, nuevoPedido);

// Mostrar todos los pedidos
router.get('/pedidos', auth, mostrarPedidos);

// Mostrar un pedido por su ID
router.get('/pedidos/:id', auth, mostrarPedido);

//Actualizar Pedido
router.put('/pedidos/:id', auth, actualizarPedido);

// Eliminar un pedido
router.delete('/pedidos/:id', auth, eliminarPedido);

/**
 * USUARIOS
 */

router.post('/crear-cuenta', auth, registrarUsuario);

router.post('/iniciar-sesion', autenticarUsuario);

export default router;
