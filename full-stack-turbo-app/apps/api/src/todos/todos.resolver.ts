import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { Todo } from './models/todo.model';
import { TodosService } from './todos.service';
import { CreateTodoInput } from './dto/create-todo.input';

@Resolver(() => Todo)
export class TodosResolver {
    constructor(private readonly todosService: TodosService) {}

    @Query(() => [Todo], { name: 'todos' })
    findAll(): Todo[] {
        return this.todosService.findAll();
    }

    @Mutation(() => Todo)
    createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput): Todo {
        return this.todosService.create(createTodoInput);
    }

    @Mutation(() => Todo)
    updateTodo(id: number, title: string, description: string, status: string): Todo {
        return this.todosService.update(id, { title, description, status });
    }

    @Mutation(() => Boolean)
    deleteTodo(id: number): boolean {
        return this.todosService.delete(id);
    }
}
