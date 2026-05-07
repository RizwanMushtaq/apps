import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PUB_SUB, createUsersPubSub } from './users.pubsub.js';

@Module({
  imports: [],
  controllers: [],
  providers: [
    UsersService,
    UsersResolver,
    {
      provide: PUB_SUB,
      useValue: createUsersPubSub(),
    },
  ],
})
export class UsersModule {}
