import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DbModule } from '../db/db.module';
import { AuthService } from './auth.service';
import { LocalStratergy } from './local.strategy';

@Module({
  imports: [PassportModule, DbModule],
  providers: [AuthService, LocalStratergy]
})
export class AuthModule { }
