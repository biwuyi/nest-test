import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { HttpException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(query?: any) {
    try {
      const { username = null, dateRange = null } = query;
      const where = {};

      if (username !== null) {
        where['username'] = Like(`%${username}%`);
      }

      if (dateRange !== null) {
        const [startDate, endDate] = dateRange;
        where['create_time'] = Between(startDate, endDate);
      }

      return await this.userRepository.find({ where });
    } catch (error) {
      throw new HttpException(error.message, error.statusCode ?? 500);
    }
  }

  async findOne(id: number) {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(error.message, error.statusCode ?? 500);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const qb = this.userRepository.createQueryBuilder();
      await qb.update().set(updateUserDto).where({ id }).execute();
      return '操作成功!';
    } catch (error) {
      throw new HttpException(error.message, error.statusCode ?? 500);
    }
  }

  async remove(id: number) {
    try {
      const qb = this.userRepository.createQueryBuilder();
      await qb.delete().where({ id }).execute();
      return '操作成功!';
    } catch (error) {
      throw new HttpException(error.message, error.statusCode ?? 500);
    }
  }
}
