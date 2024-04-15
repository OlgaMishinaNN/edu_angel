import { DataSource, DataSourceOptions } from 'typeorm';

export const dbdatasource: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: false,
  entities: ['dist/users/user.entity.js'],
  migrations: ['dist/users/migrations/*.js'],
  migrationsTableName: 'users_migrations',
};

const dataSource = new DataSource(dbdatasource);
export default dataSource;
