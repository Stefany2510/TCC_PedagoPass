import { Router } from 'express';
import HelloController from '../controllers/HelloController';
import UserController from '../controllers/UserController';
import DestinoController from '../controllers/DestinoController';

const router = Router();

// CORS middleware para desenvolvimento
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Rota de teste
router.get('/hello', HelloController.hello);

// Rotas de usuários
router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);

// Rotas de destinos
router.get('/destinos', DestinoController.index);
router.get('/destinos/:id', DestinoController.show);

export default router;
