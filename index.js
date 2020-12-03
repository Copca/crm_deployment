import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

// Habilita las variables de entorno
dotenv.config({ path: 'variables.env' });

// Habilitar cors
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
	origin: (origin, callback) => {
		// console.log(origin);
		// Revisar si la peticion eta en la lista
		const existe = whitelist.some((dominio) => dominio === origin);
		if (existe) {
			callback(null, true);
		} else {
			callback(new Error('No permitido por CORS'));
		}
	}
};

app.use(cors(corsOptions));

// Conectar a MongoDB
mongoose.connect(process.env.DB_URL, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});

// Agregar body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

// Carpeta pública
app.use(express.static('uploads'));

// Agregar las rutas
app.use('/', routes);

// Agregar el puerto y host
const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
	console.log('Servidor listo');
});
