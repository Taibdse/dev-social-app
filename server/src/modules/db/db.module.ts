import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD + '',
      database: process.env.DATABASE_NAME,
      // autoLoadEntities: true,
      entities: [User],
      synchronize: false,
      logger: 'file',
      logging: 'all'
    }),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [TypeOrmModule]
})
export class DbModule { }
