import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AdminUpdateService from '../services/UpdateAdminService';
import AppError from '../AppError';
import bcrypt from 'bcryptjs';

import Admin from '../models/AdminUser';

class AdminUserController {
  async store(req: Request, res: Response){
    const repository = getRepository(Admin);

    const { name, email, password, office } = req.body;

    const adminExists = await repository.findOne({ where: { email } });

    if (adminExists) {
      throw new AppError('Email already exists');
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const admin = repository.create({
      name,
      email,
      password: hashPassword,
      office,
    });

    await repository.save(admin);

    return res.json(admin);
  }
  async update(req: Request, res: Response){
    const adminService = new AdminUpdateService();
    const id = req.adminId;
    const { name, email, old_password, password, office } = req.body;

    const admin = await adminService.execute({
      admin_id: id,
      name: name,
      email: email,
      old_password: old_password,
      password: password,
      office: office
    });

    return res.status(200).json(admin)
  }
}

export default new AdminUserController();
