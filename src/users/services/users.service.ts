import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Consulta simple a la BD usando la entidad
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }


 // Crear un nuevo usuario
async create(data: any): Promise<User> {
  return await this.userRepository.save(data);
}


  // Buscar un usuario específico por su ID
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  // Actualizar datos de un usuario existente
  async update(id: number, changes: any): Promise<User> {
    const user = await this.userRepository.preload({
      id: id,
      ...changes,
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no se pudo actualizar porque no existe`);
    }
    return await this.userRepository.save(user);
  }

  // Eliminar un usuario de la BD
  async remove(id: string): Promise<{ deleted: boolean; id: string }> {
    const user = await this.findOne(id); // Reutiliza findOne para validar si existe
    await this.userRepository.remove(user);
    return { deleted: true, id };
  }
}

