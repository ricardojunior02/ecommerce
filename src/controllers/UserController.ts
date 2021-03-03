import { Request, Response } from 'express';
import Users from '../models/Users';
import { getRepository } from 'typeorm';
import path from 'path';
import bcrypt from 'bcryptjs';

import EtherialMail from '../shared/EtherialMail';
import UpdateProfileService from '../services/UpdateProfileService';

const sendMailClient = new EtherialMail();

class UserController {
  async store(req: Request, res: Response){
    const repository = getRepository(Users);
    const { name, email, password } = req.body;

    const findUser = await repository.findOne({ where: { email }});

    if(findUser){
      return res.status(400).json({ message: 'E-mail já existe'});
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = repository.create({
      name,
      email,
      password: hashedPassword,
    })

    await repository.save(user);

    const template = path.resolve(__dirname, '..', 'views', 'welcomeTemplate.hbs');

    const templateData = {
      file: template,
      variables: {
        name: user.name
      }
    }

    const to = {
      name: user.name,
      email: user.email
    }

    const subject = 'seja bem vindo';

    await sendMailClient.sendMail({to, subject, templateData});

    return res.json(user);
  }
  async update(req: Request, res: Response): Promise<Response>{
    const updateProfileService = new UpdateProfileService();
    const id = req.userId;
    const { name, email, old_password, password, cpf, cep, state, city, street, street_number } = req.body;

    const user = await updateProfileService.execute({
      user_id: id,
      email: email,
      old_password: old_password,
      password: password,
      cep: cep,
      state: state,
      cpf: cpf,
      name: name,
      city: city,
      street: street,
      street_number: street_number,
    })

    return res.status(200).json(user);
  }
  async delete(req: Request, res: Response): Promise<Response>{
    const repository = getRepository(Users);

    const id = req.userId;

    const user = await repository.findOne({ where: { id }});

    if(!user){
      return res.status(400).json('Usuário nao existe')
    }

    await repository.remove(user);
    return res.status(200).json('Usuário deletado')
  }
}

export default new UserController();
