import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: false,
        entities: [User],
        // entities: ['src/models/*.entity.{js,ts}'],
        // entities: [
        //   "dist/**/*.entity{.ts,.js}",
        //   "src/**/*.entity{.ts,.js}"
        // ],
        synchronize: false,
        logger: 'advanced-console',
        logging: 'all'
      })
    }),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [TypeOrmModule]
})
export class DbModule { }
