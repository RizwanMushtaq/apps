import { Injectable } from '@nestjs/common';
import {
    CreateUserInput,
    UpdateUserInput,
    UserRepository,
} from './repository/user.repository';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(data: CreateUserInput) {
        return this.userRepository.create(data);
    }

    async getAll() {
        return this.userRepository.findAll();
    }

    async getUser(id: number) {
        return await this.userRepository.findById(id);
    }

    async update(params: { id: number; data: UpdateUserInput }) {
        const { id, data } = params;
        return this.userRepository.update(id, data);
    }

    async delete(id: number) {
        return this.userRepository.delete(id);
    }
}
