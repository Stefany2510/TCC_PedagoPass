import { Request, Response } from 'express';

class HelloController {
  public async hello(req: Request, res: Response): Promise<void> {
    res.json({ message: "Backend do PedagoPass funcionando!" });
  }
}

export default new HelloController();
