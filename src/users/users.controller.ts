import { Body, Controller, Get, Param, Patch, Post, Delete, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';
@Controller('users') // .../users
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get() // /users ou /users?role=value
    findAll(@Query('role') role?: 'ADMIN' | 'CLIENT' | 'SUPPORT') {
        return this.usersService.findAll(role)
    }

    @Get('interns') // /user/interns
    findAllInterns() {
        return []
    }

    @Get(':id') // /users/id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }

    @Post()
    create(@Body(ValidationPipe) createUserDTO: CreateUserDTO) {
        return this.usersService.create(createUserDTO)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updatedUserDTO: UpdateUserDTO) {
        return this.usersService.update(id, updatedUserDTO)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id)
    }
}