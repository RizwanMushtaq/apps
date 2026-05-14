import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { MockAuthGuard } from '../common/guards/mock-auth.guard';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @UseGuards(MockAuthGuard)
    async create(@Body() createUserDto: CreateUserDto) {
        const createUserInput = {
            name: createUserDto.name,
            email: createUserDto.email,
        };
        return this.usersService.create(createUserInput);
    }

    @Get()
    async findAll() {
        return this.usersService.getAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUser(id);
    }

    @Patch(':id')
    @UseGuards(MockAuthGuard)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const updateUserInput = {
            ...(updateUserDto.name !== undefined && {
                name: updateUserDto.name,
            }),
            ...(updateUserDto.email !== undefined && {
                email: updateUserDto.email,
            }),
        };
        return this.usersService.update({
            id,
            data: updateUserInput,
        });
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
}
