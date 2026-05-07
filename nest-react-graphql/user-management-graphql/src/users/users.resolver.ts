import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dtos/createUser.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { description: 'Get all users' })
  getUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User, { description: 'Get a user by ID' })
  getUser(@Args('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, { description: 'Create a new user' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  // @Mutation(() => User, { description: 'Update an existing user' })
  // updateUser(
  //   @Args('id') id: number,
  //   @Args('updateUserInput') updateUserInput: UpdateUserInput,
  // ) {
  //   return this.usersService.update(id, updateUserInput);
  // }

  @Mutation(() => User, { description: 'Delete a user' })
  deleteUser(@Args('id') id: number) {
    return this.usersService.delete(id);
  }
}
