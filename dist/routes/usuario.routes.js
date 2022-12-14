"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_controller_1 = __importDefault(require("../controllers/usuarios.controller"));
const router = (0, express_1.Router)();
router.post('/signup', usuarios_controller_1.default.signup);
router.post('/signin', usuarios_controller_1.default.signin);
exports.default = router;
//# sourceMappingURL=usuario.routes.js.map