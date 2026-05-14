import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaUserRepository } from './repository/prismaUser.repository';
import { UserRepository } from './repository/user.repository';

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        PrismaUserRepository,
        { provide: UserRepository, useExisting: PrismaUserRepository },
    ],
})
export class UsersModule {}
