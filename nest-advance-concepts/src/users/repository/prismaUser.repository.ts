import { PrismaService } from '@app/src/common/database/prisma.service';
import {
    CreateUserInput,
    UpdateUserInput,
    User,
    UserRepository,
} from './user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany({
            select: { id: true, name: true, email: true },
        });
    }

    async findById(id: number): Promise<User> {
        return await this.prisma.user.findUniqueOrThrow({
            where: { id },
            select: { id: true, name: true, email: true },
        });
    }

    async create(user: CreateUserInput): Promise<User> {
        return this.prisma.user.create({
            data: user,
            select: { id: true, name: true, email: true },
        });
    }

    async update(id: number, user: UpdateUserInput): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data: user,
            select: { id: true, name: true, email: true },
        });
    }

    async delete(id: number): Promise<User> {
        return this.prisma.user.delete({
            where: { id },
            select: { id: true, name: true, email: true },
        });
    }
}
