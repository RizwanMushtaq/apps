import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Shipwreck Roast',
            brand: 'Buddy Brew',
            flavors: ['chocolate', 'vanilla'],
        },
    ];

    findAll() {
        return this.coffees;
    }

    findOne(id: number) {
        return this.coffees.find((coffee) => coffee.id === id);
    }

    create(coffee: CreateCoffeeDto): Coffee {
        const newCoffee = {
            id: this.coffees.length + 1,
            ...coffee,
        };
        this.coffees.push(newCoffee);
        return newCoffee;
    }

    update(id: number, coffee: UpdateCoffeeDto): void {
        const existingCoffee = this.findOne(id);
        if (existingCoffee) {
            const updatedCoffee = { ...existingCoffee, ...coffee };
            Object.assign(existingCoffee, updatedCoffee);
        }
    }

    remove(id: number) {
        this.coffees = this.coffees.filter((coffee) => coffee.id !== id);
    }
}
