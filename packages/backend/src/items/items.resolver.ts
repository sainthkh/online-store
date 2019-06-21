import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { CreateItemInput } from '../graphql';
import { CreateItemDto } from './dto/create-item.dto';

@Resolver('Items')
export class ItemsResolver {
  constructor(
    private readonly itemsService: ItemsService,
  ) {}

  @Query()
  async items() {
    return await this.itemsService.findAll();
  }

  @Mutation()
  async createItem(@Args('args') args: CreateItemInput) {
    return await this.itemsService.create({
      name: args.name,
      description: args.description,
      image: args.image,
      largeImage: args.image,
      price: args.price,
    } as CreateItemDto);
  }
}
