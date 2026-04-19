import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { PaginationQueryDto } from './dtos/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        const { limit, offset } = paginationQuery;
        console.log(`limit: ${limit}, offset: ${offset}`);
        return this.coffeesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.coffeesService.findOne(id);
    }

    @Post()
    create(@Body() body: CreateCoffeeDto) {
        return this.coffeesService.create(body);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCoffeeDto) {
        return this.coffeesService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.coffeesService.remove(id);
    }
}
