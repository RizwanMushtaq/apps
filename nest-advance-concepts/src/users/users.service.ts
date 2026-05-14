import { Injectable, NotFoundException } from '@nestjs/common';
import {
    CreateUserInput,
    UpdateUserInput,
    User,
    UserRepository,
} from './repository/user.repository';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(data: CreateUserInput): Promise<User> {
        return this.userRepository.create(data);
    }

    async getAll() {
        return this.userRepository.findAll();
    }

    async getUser(id: number) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(
                `User with unique input ${JSON.stringify(id)} not found`,
            );
        }
        return user;
    }

    async update(params: { id: number; data: UpdateUserInput }) {
        const { id, data } = params;
        await this.getUser(id);
        return this.userRepository.update(id, data);
    }

    async delete(id: number) {
        await this.getUser(id);
        return this.userRepository.delete(id);
    }
}
