import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './schema/items.schema';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { ITEM_MODEL_NAME } from './items.const';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ITEM_MODEL_NAME, schema: ItemSchema }]),
  ],
  providers: [ItemsService, ItemsResolver],
})
export class ItemsModule {}
