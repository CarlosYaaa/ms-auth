import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import Usuario from '../models/usuario.model';
import { UsuarioLoginRequest } from './dto/usuario.dto';
const JWT_KEY = process.env.JWT_KEY;
const expiresIn = { expiresIn: '7d' };

async function signup(req: Request, res: Response) {
  const body = req.body;
  if (!body) {
    return res
      .status(400)
      .json({ message: 'Porfavor complete todos los datos solicitados' });
  }

  const usuarioBD = await Usuario.findOne({ email: req.body.email });
  if (usuarioBD) {
    return res
      .status(400)
      .json({ message: 'El usuario con ese correo ya existe' });
  }
  const usuarioRegister = new Usuario({
    nombres: body.nombres,
    apellidoPaterno: body.apellidoPaterno,
    apellidoMaterno: body.apellidoMaterno,
    nombreCompleto:
      body.nombres + ' ' + body.apellidoPaterno + ' ' + body.apellidoMaterno,
    edad: body.edad,
    telefono: body.telefono,
    email: body.email,
    password: body.password,
    tipoUsuario: body.tipoUsuario,
  });
  usuarioRegister
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Perfil del usuario creado satisfactoriamente',
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: error,
      });
    });
}

async function signin(req: Request, res: Response) {
  const body: UsuarioLoginRequest = req.body;
  Usuario.findOne({ email: body.credencialesUsuario.email })
    .exec()
    .then((usuario) => {
      if (!usuario) {
        return res.status(401).json({
          message: 'No se ha encontrado al usuario',
        });
      }
      if (usuario.tipoUsuario !== body.tipoUsuario) {
        return res.status(401).json({
          message: `Este usuario no es de tipo ${usuario.tipoUsuario.toLowerCase()}`,
        });
      }
      if (
        !bcrypt.compareSync(body.credencialesUsuario.password, usuario.password)
      ) {
        return res.status(401).json({
          message: 'Contraseña errónea',
        });
      }
      const response = {
        usuario: {
          _id: usuario._id,
          nombres: usuario.nombres,
          apellidoPaterno: usuario.apellidoPaterno,
          apellidoMaterno: usuario.apellidoMaterno,
          nombreCompleto: usuario.nombreCompleto,
          edad: usuario.edad,
          telefono: usuario.telefono,
          email: usuario.email,
          tipoUsuario: usuario.tipoUsuario,
        },
      };
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json({
        message:
          'Error interno de servidor, reintente en unos minutos por favor',
        err: error,
      });
    });
}

export default {
  signup,
  signin,
};
