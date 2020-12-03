import { Usuarios } from '../models/Usuarios.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// POST /crear-cuenta
const registrarUsuario = async (req, res) => {
	// Leer los datos del usuario
	const usuario = new Usuarios(req.body);
	// usuario.password = await bcrypt.hash(req.body.password, 12);

	console.log(usuario);
	try {
		await usuario.save();
		res.json({ mensaje: 'Usuario creado Correctamdente' });
	} catch (error) {
		console.log(error);
		res.json({ mensaje: 'Hubo un error!...' });
	}
};

// POST /iniciar-sesion
const autenticarUsuario = async (req, res, next) => {
	const { email, password } = req.body;

	// Buscar el usuario
	const usuario = await Usuarios.findOne({ email });

	if (!usuario) {
		await res.status(401).json({ mensaje: 'El usuario no existe' });
		return next();
	} else {
		// El usuario existe, verificar si el password es correcto
		if (!bcrypt.compareSync(password, usuario.password)) {
			// Si el password es incorrecto
			await res.status(401).json({ mensaje: 'Password Incorrecto' });

			return next();
		} else {
			// Password correcto, firmar el token
			const token = jwt.sign(
				{
					email: usuario.email,
					nombre: usuario.nombre,
					id: usuario._id
				},
				'LLAVESECRETA',
				{
					expiresIn: '1h'
				}
			);

			// Retornar el token
			res.json({ token });
		}
	}
};

export { registrarUsuario, autenticarUsuario };
