import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../config/authConfig';

import User from '../models/Users';

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(User);

    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Usuário ou senha incorretos'});
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ message: 'Usuário ou senha incorretos'});
    }

    const token = jwt.sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expireIn,
    });

    return res.json({
      user,
      token,
    });
  }
}

export default new SessionController();
