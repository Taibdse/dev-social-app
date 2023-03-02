import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { DbModule } from '../db/db.module';
import { AuthService } from './services/auth.service';
import { LocalStratergy } from './strategies/local.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    PassportModule,
    DbModule,
    JwtModule.register({})
  ],
  providers: [AuthService, LocalStratergy, AccessTokenStrategy, RefreshTokenStrategy, GoogleStrategy],
  exports: [AuthService]
})
export class AuthModule { }
