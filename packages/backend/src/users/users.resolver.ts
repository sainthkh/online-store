import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from '../graphql';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver('Users')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Query()
  async user(@Args('id') id: string) {
    return await this.usersService.findById(id);
  }

  @Mutation()
  async createUser(@Args('args') args: CreateUserInput) {
    return await this.usersService.create({
      name: args.name,
      email: args.email,
      password: args.password,
    } as CreateUserDto);
  }
}
