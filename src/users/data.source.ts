import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './entities/user.entity';

export const dbdatasource: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: false,
  entities: [User],
  migrations: ['dist/users/migrations/*.js'],
  migrationsTableName: 'users_migrations',
};

const dataSource = new DataSource(dbdatasource);
export default dataSource;
