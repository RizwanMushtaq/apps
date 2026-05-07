import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dtos/createUser.input';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  create(createUserInput: CreateUserInput) {
    const { name, email } = createUserInput;
    const newUser = { id: this.users.length + 1, name, email };
    this.users.push(newUser);
    return newUser;
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   const user = this.findOne(id);
  //   const updatedUser = { ...user, ...updateUserInput };
  //   const index = this.users.findIndex((user) => user.id === id);
  //   this.users[index] = updatedUser;
  //   return updatedUser;
  // }

  delete(id: number) {
    const user = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return user;
  }
}
