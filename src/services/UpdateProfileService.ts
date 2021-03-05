import { getRepository, Repository } from 'typeorm';
import User from '../models/Users';
import bcrypt from 'bcryptjs';
import AppError from '../AppError';

interface UserUpdate {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
  cpf: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  street_number: string;
}

class UpdateProfileService {
  private userRepository: Repository<User>;

  constructor(){
    this.userRepository = getRepository(User);
  }

  public async execute({user_id, name, email, old_password, password, cpf, cep, state, city, street, street_number}: UserUpdate): Promise<User>{
    console.log('ok')
    const user = await this.userRepository.findOne(user_id);
    console.log(user)

    if(!user){
      throw new AppError('Usuário não existe')
    }
    if(password && !old_password){
     throw new AppError('Você precisa informar sua senha antiga para altera-la')
    }
    if(password && old_password){
      const comparePass = await bcrypt.compare(old_password, user.password)

      if(!comparePass){
        throw new AppError('Senha antiga está incorreta')
      }
      user.password = await bcrypt.hash(password, 8);
    }
    if(user.email === email){
      throw new AppError('Informe um email diferente do atual')
    }
    const findemail = await this.userRepository.findOne({ where: { email }})
    if(findemail){
      throw new AppError("Email já esta em uso");
    }

    user.email = email;
    user.name = name;
    user.cpf = cpf;
    user.cep = cep;
    user.state = state;
    user.city = city;
    user.street = street;
    user.street_number = street_number;

    return await this.userRepository.save(user);
  }
}

export default UpdateProfileService;
