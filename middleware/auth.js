import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
	// Leer el token del header
	const token = req.header('x-auth-token');

	// Revisar si no hay token
	if (!token) {
		return res.status(401).json({ mensaje: 'No hay Token, permiso no valido' });
	}

	// Validar el token
	try {
		const cifrado = jwt.verify(token, 'LLAVESECRETA');

		req.usuario = cifrado.usuario;
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({ mensaje: 'Token no válido' });
	}
};

export { auth };
