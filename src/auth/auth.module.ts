import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from 'src/configs/jwt-secrets';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './Strategies/local.strategy';
import { JwtStrategy } from './Strategies/jwt.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '1d' }
    }),
    PassportModule
  ]
})
export class AuthModule { }
