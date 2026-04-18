import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            'id': 1,
            'name': 'spagnoli',
            'role': 'ADMIN'
        }
    ]

    findAll(role?: 'CLIENT' | 'ADMIN' | 'SUPPORT') {
        if (role){
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.filter(user=> user.id === id)
        return user
    }

    create(createUserDTO: CreateUserDTO){
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDTO
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updatedUserDTO: UpdateUserDTO){
        this.users = this.users.map(user => {
            if (user.id === id){
                return {...user, ...updatedUserDTO}
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id:number){
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user=>user.id !== id)

        return removedUser
    }
}
