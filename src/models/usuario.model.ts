import mongoose from 'mongoose';
import { IUsuario } from '../interface/usuario.interface';
import { TipoUsuario } from '../enums/usuario.enum';
import bcrypt from 'bcryptjs';


const usuarioSchema = new mongoose.Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidoMaterno: {
        type: String,
        required: true
    },
    apellidoPaterno: {
        type: String,
        required: true
    },
    nombreCompleto: {
        type: String,
        required: true,
    },
    edad: {
        type: Number,
    },
    telefono: {
        type: Number,
    },
    email: { 
        type: String,
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    tipoUsuario: {
        type: String,
        enum: [
            TipoUsuario.DOCENTE,
            TipoUsuario.ESTUDIANTE
        ],
        default: TipoUsuario.ESTUDIANTE
    }
})

usuarioSchema.pre<IUsuario>('save', async function(next) {
    const user = this;
    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

usuarioSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export = mongoose.model('Usuario', usuarioSchema);



