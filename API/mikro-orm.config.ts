import { Options } from '@mikro-orm/core';
import * as dotenv from "dotenv";

dotenv.config({
    path: `./${process.env.NODE_ENV}.env`
  })

  const config = {
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],
    dbName: process.env.DB_NAME,
    type: 'mysql',
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    debug: true,
  } as Options;

export default config;