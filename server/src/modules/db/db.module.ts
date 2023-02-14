import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '123456',
      database: 'dev-social-db',
      // autoLoadEntities: true,
      entities: [User],
      synchronize: true,
      logger: 'debug',
      logging: 'all'
    }),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [TypeOrmModule]
})
export class DbModule { }
