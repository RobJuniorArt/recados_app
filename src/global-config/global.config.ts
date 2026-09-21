import { registerAs } from '@nestjs/config';

export default registerAs('globalConfig', () => ({
  database: {
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    autoLoadEntities: Boolean(process.env.DB_AUTOLOADENTITIES),
    synchronize: Boolean(process.env.DB_SYNCHRONIZE),
  },
  environment: process.env.NODE_ENV || 'development',
}));
