import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/users.schema';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { USER_MODEL_NAME } from './users.const';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: USER_MODEL_NAME, schema: UserSchema },
    ]),
  ],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
