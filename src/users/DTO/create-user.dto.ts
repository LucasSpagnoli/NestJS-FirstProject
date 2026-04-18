import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    name!: string;

    // @IsEmail()
    // email:string;

    @IsEnum(['CLIENT', 'ADMIN', 'SUPPORT'], {
        message: 'Valid role reuqired'
    })
    role!: 'CLIENT' | 'ADMIN' | 'SUPPORT'
}

