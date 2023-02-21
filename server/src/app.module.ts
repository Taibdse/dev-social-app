import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user.service';
import { DbModule } from './modules/db/db.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './controllers/auth/auth.controller';
import { loadEnvVariables } from './config/env-variables.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadEnvVariables]
    }),
    DbModule,
    AuthModule
  ],
  controllers: [UserController, AuthController],
  providers: [UserService],
})
export class AppModule { }
