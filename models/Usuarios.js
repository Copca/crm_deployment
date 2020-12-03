import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const usuariosSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true
	},
	nombre: {
		type: String,
		required: 'Agrega tu nombre'
	},
	password: {
		type: String,
		required: true
	}
});

// Método para hashear los passwords antes de ser guardado en la BD
usuariosSchema.pre('save', async function (next) {
	// Si el password ya esta hasheaddo
	if (!this.isModified('password')) {
		return next(); // deten la ejecuación
	}
	// Si no esta hasheado
	const hash = await bcrypt.hash(this.password, 12);
	this.password = hash;
	next();
});

export const Usuarios = mongoose.model('Usuarios', usuariosSchema);
