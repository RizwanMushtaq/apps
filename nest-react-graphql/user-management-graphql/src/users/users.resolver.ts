import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions/dist/pubsub';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dtos/createUser.input';
import { PUB_SUB, type UsersSubscriptionEvents } from './users.pubsub.js';
import { UpdateUserInput } from './dtos/updateUser.input';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @Inject(PUB_SUB)
    private readonly pubSub: PubSub<UsersSubscriptionEvents>,
  ) {}

  @Query(() => [User], { description: 'Get all users' })
  getUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User, { description: 'Get a user by ID' })
  getUser(@Args('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, { description: 'Create a new user' })
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = this.usersService.create(createUserInput);
    await this.pubSub.publish('userCreated', { userCreated: user });
    return user;
  }

  @Subscription(() => User, { description: 'Subscribe when a user is created' })
  userCreated() {
    return this.pubSub.asyncIterableIterator('userCreated');
  }

  @Mutation(() => User, { description: 'Update an existing user' })
  updateUser(
    @Args('id') id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User, { description: 'Delete a user' })
  deleteUser(@Args('id') id: number) {
    return this.usersService.delete(id);
  }
}
