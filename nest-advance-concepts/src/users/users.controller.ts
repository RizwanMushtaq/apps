import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: UserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    async findAll() {
        return this.usersService.getAll({});
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUser({ id });
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update({
            where: { id },
            data: updateUserDto,
        });
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete({ id });
    }
}
