import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/Users';


class AddProductImageController {
  async store(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(User);

    const { id } = req.params;
    const image = req.file.filename;

    const user = await repository.findOne({ where: { id } });

    if (!user) {
      return res.status(401).json({ message: 'Produto não existe' });
    }

    user.avatar = image

    await repository.save(user)

    return res.json(user);
  }
}

export default new AddProductImageController();
