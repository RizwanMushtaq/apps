import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { Todo } from './models/todo.model';
import { TodosService } from './todos.service';
import { CreateTodoInput } from './dtos/create-todo.input';
import { UpdateTodoInput } from './dtos/update-todo.input';

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
    updateTodo(
        @Args('id') id: number,
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
    ): Todo {
        return this.todosService.update(id, updateTodoInput);
    }

    @Mutation(() => Boolean)
    deleteTodo(@Args('id') id: number): boolean {
        return this.todosService.delete(id);
    }
}
