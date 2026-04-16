import { Injectable } from '@nestjs/common';
import { Cat } from './models/Cat.model';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }

  create(createCatInput: Omit<Cat, 'id'>): Cat {
    const newCat: Cat = {
      id: (this.cats.length + 1).toString(),
      ...createCatInput,
    };
    this.cats.push(newCat);
    return newCat;
  }
}
