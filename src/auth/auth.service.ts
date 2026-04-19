import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

type AuthInput = { username: string; password: string }
type SignInData = { userId: number; username: string }
type AuthResult = { accessToken: string; userId:number; username: string }

@Injectable()
export class AuthService {
    constructor(private usersServices: UsersService) { }

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.usersServices.findUserByName(input.username)

        // if(user && user.password === input.password)
        if (user) {
            return {
                userId: user.id,
                username: user.name
            }
        }

        return null
    }

    async authenticate(input: AuthInput): Promise<AuthResult>{
        const user = await this.validateUser(input);

        if (!user) {
            throw new UnauthorizedException()
        }
        
        return {
            accessToken: 'access',
            userId: user.userId,
            username: user.username
        }
    }
}
