import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
    ) {}

    findAll() {
        return this.coffeeRepository.find();
    }

    async findOne(id: number) {
        const coffee = await this.coffeeRepository.findOne({ where: { id } });
        if (!coffee) {
            throw new NotFoundException(`Coffee with id ${id} not found`);
        }
        return coffee;
    }

    create(createCoffeeDto: CreateCoffeeDto) {
        const newCoffee = this.coffeeRepository.create(createCoffeeDto);
        return this.coffeeRepository.save(newCoffee);
    }

    async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
        const existingCoffee = await this.coffeeRepository.preload({ id, ...updateCoffeeDto });
        if (!existingCoffee) {
            throw new NotFoundException(`Coffee with id ${id} not found`);
        }
        return this.coffeeRepository.save(existingCoffee);
    }

    async remove(id: number) {
        const existingCoffee = await this.findOne(id);
        return this.coffeeRepository.remove(existingCoffee);
    }
}
