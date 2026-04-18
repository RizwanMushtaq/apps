import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { Todo } from './models/todo.model';

@Injectable()
export class TodosService {
    private todos: Todo[] = [];

    findAll() {
        return this.todos;
    }

    create(todo: CreateTodoInput) {
        const newTodo: Todo = { id: Date.now(), ...todo };
        this.todos.push(newTodo);
        return newTodo;
    }

    update(id: number, updatedFields: Partial<CreateTodoInput>) {
        const todoIndex = this.todos.findIndex((todo) => todo.id === id);
        if (todoIndex === -1) {
            throw new Error('Todo not found');
        }
        const updatedTodo = { ...this.todos[todoIndex], ...updatedFields };
        this.todos[todoIndex] = updatedTodo;
        return updatedTodo;
    }

    delete(id: number) {
        const todoIndex = this.todos.findIndex((todo) => todo.id === id);
        if (todoIndex === -1) {
            throw new Error('Todo not found');
        }
        this.todos.splice(todoIndex, 1);
        return true;
    }
}
