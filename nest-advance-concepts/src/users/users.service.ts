import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { Prisma } from '@app/generated/prisma/client';

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: PrismaService) {}

    async create(data: Prisma.UserCreateInput) {
        console.log('Creating user with data:', data);
        await this.databaseService.user.create({ data });
    }

    async users(params: {
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

    async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
        return this.databaseService.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    async update(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }) {
        const { where, data } = params;
        return this.databaseService.user.update({
            data,
            where,
        });
    }

    async delete(where: Prisma.UserWhereUniqueInput) {
        return this.databaseService.user.delete({
            where,
        });
    }
}
