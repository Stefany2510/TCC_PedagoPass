import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { UserDTO, LoginDTO } from '../models/User';

class UserController {
  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const userData: UserDTO = req.body;

      // Validação básica
      if (!userData.email || !userData.password || !userData.name) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const result = UserService.register(userData);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const loginData: LoginDTO = req.body;

      // Validação básica
      if (!loginData.email || !loginData.password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }

      const result = UserService.login(loginData);
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default new UserController();
