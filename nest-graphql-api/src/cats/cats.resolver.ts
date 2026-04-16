import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cat } from './models/Cat.model';
import { CatsService } from './cats.service';
import { CreateCatInput } from './dto/create-cat.input';

@Resolver(() => Cat)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => [Cat], { name: 'cats' })
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Mutation(() => Cat)
  createCat(@Args('createCatInput') createCatInput: CreateCatInput): Cat {
    return this.catsService.create(createCatInput);
  }
}
