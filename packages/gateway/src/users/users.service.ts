import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_MODEL_NAME } from './users.const';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER_MODEL_NAME) private readonly userModel: Model<IUser>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findById(id: string): Promise<IUser> {
    return this.userModel.findById(id);
  }

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }
}
