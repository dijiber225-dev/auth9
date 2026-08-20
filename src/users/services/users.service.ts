import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // GET /users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // POST /users
  async create(data: CreateUserDto): Promise<User> {
    return await this.userRepository.save(data);
  }

  // GET /users/:id
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(
        `Usuario con ID ${id} no encontrado`,
      );
    }

    return user;
  }

  // PATCH /users/:id
 async update(
  id: string,
  changes: UpdateUserDto,
): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...changes,
    });

    if (!user) {
      throw new NotFoundException(
        `Usuario con ID ${id} no se pudo actualizar porque no existe`,
      );
    }

    return await this.userRepository.save(user);
  }

  // DELETE /users/:id
  async remove(
    id: string,
  ): Promise<{ deleted: boolean; id: string }> {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);

    return {
      deleted: true,
      id,
    };
  }
}