import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportLocalGuard } from "./Guards/passport-local.guard";
import { PassportJwtAuthGuard } from "./Guards/passport-jwt.guard";

@Controller('auth-v2')
export class PassportAuthController {
    constructor(private auth: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(PassportLocalGuard)
    login(@Request() request) {
        return this.auth.signIn(request.user)
    }

    @Get('me')
    @UseGuards(PassportJwtAuthGuard)
    getUserInfo(@Request() request) {
        return request.user;
    }
}