export interface User {
    id: number;
    name: string;
    email: string;
}

export interface CreateUserInput {
    name: string;
    email: string;
}

export type UpdateUserInput = Partial<CreateUserInput>;

export abstract class UserRepository {
    abstract findAll(): Promise<User[]>;
    abstract findById(id: number): Promise<User>;
    abstract create(user: CreateUserInput): Promise<User>;
    abstract update(id: number, user: UpdateUserInput): Promise<User>;
    abstract delete(id: number): Promise<User>;
}
