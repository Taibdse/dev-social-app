import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user.service';
import { DbModule } from './modules/db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DbModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule { }
