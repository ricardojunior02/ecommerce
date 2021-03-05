import { getRepository, Repository } from 'typeorm';
import Admin from '../models/AdminUser';
import bcrypt from 'bcryptjs';
import AppError from '../AppError';

interface AdminUpdate {
  admin_id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
  office: string;
}

class UpdateProfileService {
  private adminRepository: Repository<Admin>;

  constructor(){
    this.adminRepository = getRepository(Admin);
  }

  public async execute({admin_id, name, email, old_password, password, office, }: AdminUpdate): Promise<Admin>{
    const admin = await this.adminRepository.findOne(admin_id);

    if(!admin){
      throw new AppError('Usuário não existe')
    }

    if(password && !old_password){
     throw new AppError('Você precisa informar sua senha antiga para altera-la')
    }

    if(password && old_password){
      const comparePass = await bcrypt.compare(old_password, admin.password)

      if(!comparePass){
        throw new AppError('Senha antiga está incorreta')
      }
      admin.password = await bcrypt.hash(password, 8);
    }

    if(admin.email === email){
      throw new AppError('Informe um email diferente do atual')
    }

    const findemail = await this.adminRepository.findOne({ where: { email }})
    if(findemail){
      throw new AppError("Email já esta em uso");
    }

    admin.email = email;
    admin.name = name;
    admin.office = office;

    await this.adminRepository.save(admin);

    return admin;
  }
}

export default UpdateProfileService;
