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
const mongoose_1 = __importDefault(require("mongoose"));
const usuario_enum_1 = require("../enums/usuario.enum");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuarioSchema = new mongoose_1.default.Schema({
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
            usuario_enum_1.TipoUsuario.DOCENTE,
            usuario_enum_1.TipoUsuario.ESTUDIANTE
        ],
        default: usuario_enum_1.TipoUsuario.ESTUDIANTE
    }
});
usuarioSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password'))
            return next();
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hash = yield bcryptjs_1.default.hash(user.password, salt);
        user.password = hash;
        next();
    });
});
usuarioSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, this.password);
    });
};
module.exports = mongoose_1.default.model('Usuario', usuarioSchema);
//# sourceMappingURL=usuario.model.js.map