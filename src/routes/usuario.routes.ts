import { Router } from 'express';
import usuarioController from '../controllers/usuarios.controller';
const router = Router();

router.post(
    '/signup',
    usuarioController.signup
);

router.post(
    '/signin',
    usuarioController.signin
);


export default router;