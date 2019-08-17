import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IItem } from './interface/item.interface';
import { CreateItemDto } from './dto/create-item.dto';
import { ITEM_MODEL_NAME } from './items.const';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(ITEM_MODEL_NAME) private readonly itemModel: Model<IItem>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<IItem> {
    const createdItem = new this.itemModel(createItemDto);
    return await createdItem.save();
  }

  async findAll(): Promise<IItem[]> {
    return await this.itemModel.find().exec();
  }
}
