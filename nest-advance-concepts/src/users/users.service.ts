import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { Prisma } from '@app/generated/prisma/client';

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: PrismaService) {}

    async create(data: Prisma.UserCreateInput) {
        return this.databaseService.user.create({ data });
    }

    async getAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.databaseService.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async getUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
        const user = await this.databaseService.user.findUnique({
            where: userWhereUniqueInput,
        });
        if (!user) {
            throw new NotFoundException(
                `User with unique input ${JSON.stringify(userWhereUniqueInput)} not found`,
            );
        }
        return user;
    }

    async update(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }) {
        const { where, data } = params;
        await this.getUser(where);
        return this.databaseService.user.update({
            data,
            where,
        });
    }

    async delete(where: Prisma.UserWhereUniqueInput) {
        await this.getUser(where);
        return this.databaseService.user.delete({
            where,
        });
    }
}
