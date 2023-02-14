import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user.service';
import { DbModule } from './modules/db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5433,
    //   username: 'postgres',
    //   password: '123456',
    //   database: 'dev-social-db',
    //   autoLoadEntities: true,
    //   entities: [User],
    //   synchronize: true,
    //   logger: 'debug',
    //   logging: 'all'
    // }),
    // TypeOrmModule.forFeature([User]),
    DbModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule { }
