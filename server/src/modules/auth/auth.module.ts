import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { DbModule } from '../db/db.module';
import { AuthService } from './auth.service';
import { LocalStratergy } from './local.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    PassportModule,
    DbModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' }
    })
  ],
  providers: [AuthService, LocalStratergy, JwtStrategy, GoogleStrategy],
  exports: [AuthService]
})
export class AuthModule { }
