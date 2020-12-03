import mongoose from 'mongoose';
const { Schema } = mongoose;

const productosSchema = new Schema({
	nombre: {
		type: String,
		trim: true
	},
	precio: {
		type: Number
	},
	imagen: {
		type: String
	}
});

export const Productos = mongoose.model('Productos', productosSchema);
