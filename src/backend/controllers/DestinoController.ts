import { Request, Response } from 'express';
import DestinoService from '../services/DestinoService';

class DestinoController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { search } = req.query;
      
      if (search && typeof search === 'string') {
        const destinos = DestinoService.search(search);
        return res.json(destinos);
      }

      const destinos = DestinoService.findAll();
      return res.json(destinos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const destino = DestinoService.findById(id);

      if (!destino) {
        return res.status(404).json({ error: 'Destino não encontrado' });
      }

      return res.json(destino);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default new DestinoController();
