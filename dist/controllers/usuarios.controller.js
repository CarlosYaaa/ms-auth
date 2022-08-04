"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const JWT_KEY = process.env.JWT_KEY;
const expiresIn = { expiresIn: '7d' };
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        if (!body) {
            return res
                .status(400)
                .json({ message: 'Porfavor complete todos los datos solicitados' });
        }
        const usuarioBD = yield usuario_model_1.default.findOne({ email: req.body.email });
        if (usuarioBD) {
            return res
                .status(400)
                .json({ message: 'El usuario con ese correo ya existe' });
        }
        const usuarioRegister = new usuario_model_1.default({
            nombres: body.nombres,
            apellidoPaterno: body.apellidoPaterno,
            apellidoMaterno: body.apellidoMaterno,
            nombreCompleto: body.nombres + ' ' + body.apellidoPaterno + ' ' + body.apellidoMaterno,
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
    });
}
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        usuario_model_1.default.findOne({ email: body.credencialesUsuario.email })
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
            if (!bcryptjs_1.default.compareSync(body.credencialesUsuario.password, usuario.password)) {
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
                message: 'Error interno de servidor, reintente en unos minutos por favor',
                err: error,
            });
        });
    });
}
exports.default = {
    signup,
    signin,
};
//# sourceMappingURL=usuarios.controller.js.map