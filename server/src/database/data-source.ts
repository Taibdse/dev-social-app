require('dotenv').config();
import { User } from 'src/models/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import UserSeeder from './seeds/user.seeder';
import UserFactory from './factories/user.factory';
import { CreateUserTable1677129734816 } from './migrations/1677129734816-CreateUserTable';

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User],
  migrations: [CreateUserTable1677129734816],
  // seeds: ['src/database/seeds/**/*{.ts,.js}'],
  seeds: [UserSeeder],
  factories: [UserFactory],
  // factories: ['src/database/factories/**/*{.ts,.js}'],
  migrationsRun: true,
  logging: 'all',
  ...(process.env.DATABASE_SSL === 'true'
    ? {
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }
    : {}),
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

dataSource.initialize()
  .then((res) => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  });
