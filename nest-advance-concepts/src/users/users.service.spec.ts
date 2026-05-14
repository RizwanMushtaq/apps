import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User, UserRepository } from './repository/user.repository';

describe('UsersService', () => {
    let service: UsersService;

    const findAll = jest.fn();
    const findById = jest.fn();
    const create = jest.fn();
    const update = jest.fn();
    const remove = jest.fn();

    const mockUserRepository: jest.Mocked<UserRepository> = {
        findAll,
        findById,
        create,
        update,
        delete: remove,
    };

    const user: User = {
        id: 1,
        name: 'Rizwan',
        email: 'rizwan@example.com',
    };

    beforeEach(async () => {
        jest.clearAllMocks();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: UserRepository,
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('delegates to repository.create and returns the created user', async () => {
            const input = {
                name: 'Rizwan',
                email: 'rizwan@example.com',
            };

            mockUserRepository.create.mockResolvedValue(user);

            await expect(service.create(input)).resolves.toEqual(user);
            expect(create).toHaveBeenCalledTimes(1);
            expect(create).toHaveBeenCalledWith(input);
        });
    });

    describe('getAll', () => {
        it('delegates to repository.findAll and returns all users', async () => {
            mockUserRepository.findAll.mockResolvedValue([user]);

            await expect(service.getAll()).resolves.toEqual([user]);
            expect(findAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('getUser', () => {
        it('delegates to repository.findById and returns the user', async () => {
            mockUserRepository.findById.mockResolvedValue(user);

            await expect(service.getUser(1)).resolves.toEqual(user);
            expect(findById).toHaveBeenCalledTimes(1);
            expect(findById).toHaveBeenCalledWith(1);
        });

        it('propagates repository errors', async () => {
            const error = new Error('User not found');
            mockUserRepository.findById.mockRejectedValue(error);

            await expect(service.getUser(999)).rejects.toThrow(error);
            expect(findById).toHaveBeenCalledWith(999);
        });
    });

    describe('update', () => {
        it('delegates to repository.update and returns the updated user', async () => {
            const data = { name: 'Updated Rizwan' };
            const updatedUser: User = { ...user, ...data };

            mockUserRepository.update.mockResolvedValue(updatedUser);

            await expect(service.update({ id: 1, data })).resolves.toEqual(
                updatedUser,
            );
            expect(update).toHaveBeenCalledTimes(1);
            expect(update).toHaveBeenCalledWith(1, data);
        });

        it('propagates repository errors', async () => {
            const error = new Error('Update failed');
            const data = { name: 'Updated Rizwan' };

            mockUserRepository.update.mockRejectedValue(error);

            await expect(service.update({ id: 1, data })).rejects.toThrow(
                error,
            );
            expect(update).toHaveBeenCalledWith(1, data);
        });
    });

    describe('delete', () => {
        it('delegates to repository.delete and returns the deleted user', async () => {
            mockUserRepository.delete.mockResolvedValue(user);

            await expect(service.delete(1)).resolves.toEqual(user);
            expect(remove).toHaveBeenCalledTimes(1);
            expect(remove).toHaveBeenCalledWith(1);
        });

        it('propagates repository errors', async () => {
            const error = new Error('Delete failed');
            mockUserRepository.delete.mockRejectedValue(error);

            await expect(service.delete(1)).rejects.toThrow(error);
            expect(remove).toHaveBeenCalledWith(1);
        });
    });
});
