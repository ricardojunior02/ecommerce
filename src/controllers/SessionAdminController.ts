import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Admin from '../models/AdminUser';
import adminAuth from '../config/adminAuth';

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(Admin);

    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Usuário ou senha incorretos'});
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ message: 'Usuário ou senha incorretos'});
    }

    console.log('ADMINAUTH', adminAuth.secret)

    const token = jwt.sign({}, adminAuth.secret, {
      subject: user.id,
      expiresIn: adminAuth.expireIn,
    });

    return res.json({
      user,
      token,
    });
  }
}

export default new SessionController();
