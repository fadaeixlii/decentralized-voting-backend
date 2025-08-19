import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
// import { join } from 'path';
import {
  POSTGRES_DATABASE,
  POSTGRES_DROP_SCHEMA,
  POSTGRES_HOST,
  POSTGRES_LOGGING,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_SYNCHRONIZE,
  POSTGRES_USER,
} from 'src/env';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  // entities: [PostEntity],
  entities: [join(__dirname, '..', '..', '**', '*.entity.{ts,js}')],
  // migrations: [join(__dirname, '..', '..', 'migrations', '*.ts')],
  synchronize: POSTGRES_SYNCHRONIZE,
  dropSchema: POSTGRES_DROP_SCHEMA,
  logging: POSTGRES_LOGGING,
};
